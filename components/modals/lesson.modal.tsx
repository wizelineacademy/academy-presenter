import cx from 'classnames';
import * as Yup from 'yup';
import {ShowIf} from "../show-if";
import {useFormik} from "formik";
import {useModal} from "../../states/modal/modal.machine.service";
import {Lesson} from "../../domain/lesson";
import {CloseModal, ShowModal} from "../../states/modal/modal.machine.events";
import {ModalOptions} from "../../domain/modal";
import {forwardRef} from "react";
import {SaveLesson} from "../../states/lessons/lessons.machine.events";
import {createhasErrors} from "./modal.utils";

type LessonModalProps = {
    courseId: string;
    dispatch: any;
};

export const LessonModal = forwardRef(({courseId, dispatch}: LessonModalProps, ref) => {
    const [modalState, sendModal] = useModal();
    const modalClasses = cx('modal', {'is-active': modalState.matches('visible')});

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

    const hasErrors = createhasErrors(lessonForm);

    const close = () => {
        lessonForm.resetForm({});
        sendModal(new CloseModal());
    };

    const open = (opts: ModalOptions) => {
        sendModal(new ShowModal(opts))
    };

    // @ts-ignore
    ref.current = {open, close};

    return (
        <div className={modalClasses}>
            <div className="modal-background"/>
            <div className="modal-card">
                <header className="modal-card-head">
                    <p className="modal-card-title">Add a Lesson</p>
                    <button className="delete" aria-label="close" onClick={close}/>
                </header>
                <section className="modal-card-body">
                    <form onSubmit={lessonForm.handleSubmit}>
                        <div className="field is-horizontal">
                            <div className="field-label is-normal">
                                <label className="label" htmlFor="name">Name *</label>
                            </div>
                            <div className="field-body">
                                <div className="field">
                                    <div className="control">
                                        <input
                                            className="input"
                                            type="text"
                                            name="name"
                                            placeholder="e.g. First step to create awesome pages"
                                            onChange={lessonForm.handleChange}
                                            onBlur={lessonForm.handleBlur}
                                            value={lessonForm.values.name || ''}
                                        />
                                    </div>
                                    <ShowIf condition={hasErrors('name')}>
                                        <p className="help is-danger">
                                            {lessonForm.errors.name}
                                        </p>
                                    </ShowIf>
                                </div>
                            </div>
                        </div>
                        <div className="field is-horizontal">
                            <div className="field-label is-normal">
                                <label className="label" htmlFor="summary">Summary *</label>
                            </div>
                            <div className="field-body">
                                <div className="field">
                                    <div className="control">
                                        <textarea
                                            className="textarea"
                                            name="summary"
                                            placeholder="e.g. We should create awesome stuffs"
                                            onChange={lessonForm.handleChange}
                                            onBlur={lessonForm.handleBlur}
                                            value={lessonForm.values.summary || ''}
                                        />
                                    </div>
                                    <ShowIf condition={hasErrors('summary')}>
                                        <p className="help is-danger">
                                            {lessonForm.errors.summary}
                                        </p>
                                    </ShowIf>
                                </div>
                            </div>
                        </div>
                        <div className="field is-horizontal">
                            <div className="field-label is-normal">
                                <label className="label" htmlFor="summary">Position</label>
                            </div>
                            <div className="field-body">
                                <div className="field">
                                    <div className="control">
                                        <input
                                            className="input"
                                            type="number"
                                            name="position"
                                            placeholder="1"
                                            onChange={lessonForm.handleChange}
                                            onBlur={lessonForm.handleBlur}
                                            value={lessonForm.values.position || ''}
                                        />
                                    </div>
                                    <ShowIf condition={hasErrors('summary')}>
                                        <p className="help is-danger">
                                            {lessonForm.errors.position}
                                        </p>
                                    </ShowIf>
                                </div>
                            </div>
                        </div>
                        <div className="field is-grouped is-grouped-right">
                            <div className="control">
                                <button className="button is-success" type="submit">Save changes</button>
                            </div>
                            <div className="control">
                                <button onClick={close} className="button">Cancel</button>
                            </div>
                        </div>
                    </form>
                </section>
            </div>
        </div>
    );
});
