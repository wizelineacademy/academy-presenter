import React, {useRef} from 'react';
import * as Yup from 'yup';
import {useFormik} from "formik";
import {Lesson} from "../../domain/lesson";
import {ModalOptions} from "../../domain/modal";
import {forwardRef} from "react";
import {SaveLesson} from "../../states/lessons/lessons.machine.events";
import {TextField} from '../TextField/TextField';
import {TextArea} from '../TextArea/TextArea';
import {Button} from '../Button/Button';
import {Modal} from './Modal';

type LessonModalProps = {
    courseId: string;
    dispatch: any;
};

export const LessonModal = forwardRef(({courseId, dispatch}: LessonModalProps, ref) => {
    const modalRef = useRef();

    const lessonForm = useFormik({
        initialValues: new Lesson(),
        validationSchema: Yup.object({
            name: Yup.string().required('A lesson name is required'),
            summary: Yup.string().required('A summary is required'),
        }),
        onSubmit: (lesson: Lesson) => {
            if (lesson.id) {
                lesson.updatedAt = Date.now();
            } else {
                lesson.updatedAt = Date.now();
                lesson.createdAt = Date.now();
                lesson.createdBy = 'jorge@wizeline.com';
                lesson.speaker = 'jorge@wizeline.com';
                lesson.position = lesson.position >= 0 ? lesson.position : 0;
                lesson.courseId = courseId;
                // we can include the machine reference here and make the correct call;
            }
            dispatch(new SaveLesson(lesson));
        }
    });

    const close = () => {
        lessonForm.resetForm({});
        modalRef.current.close();
    };

    const open = (opts: ModalOptions) => {
        modalRef.current.open(opts);
    };

    // @ts-ignore
    ref.current = {open, close};

    return (
        <Modal ref={modalRef} title="Add a Lesson" hideControls={true} >
            <section>
                <form onSubmit={lessonForm.handleSubmit}>
                    <TextField
                        label="Name *"
                        name="name"
                        placeholder="e.g. First step to create awesome pages"
                        onChange={lessonForm.handleChange}
                        onBlur={lessonForm.handleBlur}
                        value={lessonForm.values.name || ''}
                        errors={lessonForm.errors.name}
                    />
                    <TextArea
                        label="Summary *"
                        name="summary"
                        placeholder="e.g. We should create awesome stuffs"
                        onChange={lessonForm.handleChange}
                        onBlur={lessonForm.handleBlur}
                        value={lessonForm.values.summary || ''}
                        errors={lessonForm.errors.summary}
                    />
                    <TextField
                        label="Position"
                        name="position"
                        type="number"
                        placeholder="1"
                        onChange={lessonForm.handleChange}
                        onBlur={lessonForm.handleBlur}
                        value={lessonForm.values.position || ''}
                    />
                    <div className="flex items-center justify-end">
                        <Button onClick={close}>Cancel</Button>
                        <Button variant="primary" className="ml-2" type="submit">Save changes</Button>
                    </div>
                </form>
            </section>
        </Modal>
    );
});
