import React from 'react';
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

type TopicModalProps = {
    courseId: string;
    lessonId: string;
    sendTopic: any;
};

export const TopicModal = forwardRef(({courseId, lessonId, sendTopic}: TopicModalProps, ref) => {
    const [modalState, sendModal] = useModal();
    const modalClasses = cx('modal', {'is-active': modalState.matches('visible')});

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
                    <p className="modal-card-title">Add a new Topic</p>
                    <button className="delete" aria-label="close" onClick={close}/>
                </header>
                <section className="modal-card-body">
                    <form onSubmit={topicForm.handleSubmit}>
                        <div className="field is-horizontal">
                            <div className="field-label is-normal">
                                <label className="label" htmlFor="title">Title *</label>
                            </div>
                            <div className="field-body">
                                <div className="field">
                                    <div className="control">
                                        <input
                                            className="input"
                                            type="text"
                                            name="title"
                                            placeholder="e.g. First step to create awesome pages"
                                            onChange={topicForm.handleChange}
                                            onBlur={topicForm.handleBlur}
                                            value={topicForm.values.title || ''}
                                        />
                                    </div>
                                    <ShowIf condition={hasErrors('title')}>
                                        <p className="help is-danger">
                                            {topicForm.errors.title}
                                        </p>
                                    </ShowIf>
                                </div>
                            </div>
                        </div>
                        <div className="field is-horizontal">
                            <div className="field-label is-normal">
                                <label className="label" htmlFor="description">Description *</label>
                            </div>
                            <div className="field-body">
                                <div className="field">
                                    <div className="control">
                                        <input
                                            className="input"
                                            type="text"
                                            name="description"
                                            placeholder="e.g. Working with different tools helps to debugging..."
                                            onChange={topicForm.handleChange}
                                            onBlur={topicForm.handleBlur}
                                            value={topicForm.values.description || ''}
                                        />
                                    </div>
                                    <ShowIf condition={hasErrors('description')}>
                                        <p className="help is-danger">
                                            {topicForm.errors.description}
                                        </p>
                                    </ShowIf>
                                </div>
                            </div>
                        </div>
                        <div className="field is-horizontal">
                            <div className="field-label is-normal">
                                <label className="label" htmlFor="summary">Summary</label>
                            </div>
                            <div className="field-body">
                                <div className="field">
                                    <div className="control">
                                        <textarea
                                            className="textarea"
                                            name="summary"
                                            placeholder="Second, use lorem ipsum if you think the placeholder text will be too distracting. For specific projects, collaboration between copywriters and designers may be best, "
                                            onChange={topicForm.handleChange}
                                            onBlur={topicForm.handleBlur}
                                            value={topicForm.values.summary || ''}
                                        />
                                    </div>
                                    <ShowIf condition={hasErrors('summary')}>
                                        <p className="help is-danger">
                                            {topicForm.errors.summary}
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
