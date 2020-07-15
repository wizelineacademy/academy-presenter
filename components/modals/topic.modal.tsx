import React, {useRef} from 'react';
import cx from 'classnames';
import * as Yup from 'yup';
import {ShowIf} from "../show-if";
import {useFormik} from "formik";
import {useModal} from "../../states/modal/modal.machine.service";
import {CloseModal, ShowModal} from "../../states/modal/modal.machine.events";
import {ModalOptions} from "../../domain/modal";
import {forwardRef} from "react";
import {Topic} from "../../domain/topic";
import {SaveTopic} from "../../states/topics/topics.machine.events";
import {createhasErrors} from "./modal.utils";
import {TextField} from '../TextField/TextField';
import {TextArea} from '../TextArea/TextArea';
import {Button} from '../Button/Button';
import {Modal} from '../modals/Modal';

type TopicModalProps = {
    courseId: string;
    lessonId: string;
    sendTopic: any;
};

export const TopicModal = forwardRef(({courseId, lessonId, sendTopic}: TopicModalProps, ref) => {
    const modalRef = useRef();

    const topicForm = useFormik({
        initialValues: new Topic(),
        validationSchema: Yup.object({
            title: Yup.string().required('A topic title is required'),
            description: Yup.string().required('A description is required'),
            summary: Yup.string().required('A summary is required'),
        }),
        onSubmit: (topic: Topic) => {
            if (topic.id) {
                topic.updatedAt = Date.now();
                // sendTopic(new UpdateTopic(topic));
            } else {
                topic.updatedAt = Date.now();
                topic.createdAt = Date.now();
                topic.createdBy = 'jorge@wizeline.com';
                topic.courseId = courseId;
                topic.lessonId = lessonId;
                sendTopic(new SaveTopic(topic));
            }
        }
    });

    const hasErrors = createhasErrors(topicForm);

    const close = () => {
        topicForm.resetForm({});
        modalRef.current.close();
    };

    const open = (opts: ModalOptions) => {
        modalRef.current.open(opts);
    };

    // @ts-ignore
    ref.current = {open, close};

    return (
        <Modal ref={modalRef} title="Add a new Topic" hideControls={true} >
            <section>
                <form onSubmit={topicForm.handleSubmit}>
                    <TextField
                        label="Title *"
                        name="title"
                        placeholder="e.g. First step to create awesome pages"
                        onChange={topicForm.handleChange}
                        onBlur={topicForm.handleBlur}
                        value={topicForm.values.title || ''}
                        errors={topicForm.errors.title}
                    />
                    <TextField
                        label="Description *"
                        name="description"
                        placeholder="e.g. Working with different tools helps to debugging..."
                        onChange={topicForm.handleChange}
                        onBlur={topicForm.handleBlur}
                        value={topicForm.values.description || ''}
                        errors={topicForm.errors.description}
                    />
                    <TextArea
                        label="Summary"
                        name="summary"
                        placeholder="Second, use lorem ipsum if you think the placeholder text will be too distracting. For specific projects, collaboration between copywriters and designers may be best, "
                        onChange={topicForm.handleChange}
                        onBlur={topicForm.handleBlur}
                        value={topicForm.values.summary || ''}
                        errors={topicForm.errors.summary}
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
