import React, {useEffect, useRef, useState} from "react";
import cx from 'classnames';
import {Lesson} from "../../domain/lesson";
import {ShowIf} from "../show-if";
import Link from "next/link";
import {DeleteConfirmationModal} from "../modals/delete.confirmation.modal";
import {matchPastState} from "../../states/states.utils";
import {TopicModal} from "../modals/topic.modal";
import {Topic} from "../../domain/topic";
import dynamic from "next/dynamic";
import {BlockContent} from "../../domain/content";

const ContentEditor = dynamic(() => import('../content-editor'), {ssr: false});

type LessonListProps = {
    courseId: string;
    lessons: Lesson[];
    topics: Topic[];
    blocks: BlockContent[];
    onAddLesson?: any;
    isAdmin?: boolean;
    sendTopic?: any;
    topicState?: any;
    send?: any;
    state?: any;
    preview?: boolean;
    sendContent?: any;
}

export const LessonList = (props: LessonListProps) => {
    const {
        lessons = [],
        topics=[],
        blocks = [],
        isAdmin = false,
        send,
        sendContent,
        sendTopic,
        state,
        preview = false,
        onAddLesson,
        topicState,
        courseId,
    } = props;
    const [selectedLesson, setSelectedLesson] = useState(null);
    const [lessonTopics, setLessonTopics] = useState([]);
    const deleteModalRef = useRef(null);
    const addTopicModalRef = useRef(null);

    const byLesson = (topic: Topic) => topic.lessonId === selectedLesson.id;

    const isActive = (lesson: Lesson) => {
        return selectedLesson && lesson.id === selectedLesson.id;
    };

    const selectLesson = (lesson: Lesson) => {
        if (!selectedLesson || selectedLesson !== lesson.id) {
            setSelectedLesson(lesson);
        }
    };

    const assignDefaultSelection = () => {
        const hasNotSelection = !selectedLesson && lessons.length > 0;
        const currentSelectionRemoved = selectedLesson && !lessons.includes(selectedLesson);

        if (hasNotSelection || currentSelectionRemoved) {
            setSelectedLesson(lessons[0]);
        }
    };

    const deleteLesson = (event, lesson: Lesson) => {
        event.stopPropagation();
        deleteModalRef.current.showModal({
            name: lesson.name,
            type: 'Course',
            entity: lesson
        });
    };

    const openTopicDialog = () => {
        addTopicModalRef.current.open();
    }

    const updateTopicsLesson = () => {
        const filteredTopics: Topic[] = selectedLesson ? topics.filter(byLesson) : []
        setLessonTopics(filteredTopics)
    }

    const closeDeleteModalAfterDeleted = () => {
        if (state && matchPastState(state, 'deleting')) {
            deleteModalRef.current.closeModal();
        }
    }

    const closeAddTopicModalAfterAdded = () => {
        if (topicState && matchPastState(topicState, 'saving')) {
            addTopicModalRef.current.close();
        }
    }

    const filteredBlocks = (topicId): BlockContent[] => {
        return blocks.filter(block => {
            return block.topicId === topicId && block.courseId === courseId;
        })
    }

    const slideULR = (courseId) => selectedLesson ? `/slides/${selectedLesson.id}?course=${courseId}` : '#';

    useEffect(assignDefaultSelection, [lessons]);
    useEffect(updateTopicsLesson, [selectedLesson])
    useEffect(closeDeleteModalAfterDeleted, [state]);
    useEffect(closeAddTopicModalAfterAdded, [topicState]);

    return (
        <>
            <div className="columns">
                <div className="column is-one-quarter">
                    <aside className="menu">
                        <p className="menu-label">
                            Lessons
                            <ShowIf condition={preview}>
                                <button onClick={onAddLesson} className="button is-small is-pulled-right is-primary"><span>+</span></button>
                            </ShowIf>
                        </p>
                        <ul className="menu-list">
                            {lessons.map((lesson: Lesson, idx) => (
                                <li className="lesson-list-item" key={lesson.id || idx} onClick={() => selectLesson(lesson)}>
                                    <a className={cx({'is-active': isActive(lesson)})}>{lesson.name}
                                    <ShowIf condition={isAdmin}>
                                        <span
                                            onClick={(evt) => deleteLesson(evt, lesson)}
                                            className="lesson-action is-pulled-right delete"
                                        />
                                    </ShowIf>
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </aside>
                </div>
                <div className="column">
                    <ShowIf condition={selectedLesson}>
                        <h2 className="is-size-2">{selectedLesson && selectedLesson.name}</h2>
                        <h4 className="is-size-4">Objective</h4>
                        <p>
                            {selectedLesson && selectedLesson.summary}
                        </p>
                        <ShowIf condition={preview}>
                            <Link href={slideULR(courseId)}>
                                <a className="button is-success is-light" target="_blank">Preview</a>
                            </Link>
                        </ShowIf>
                        <ShowIf condition={preview}>
                            <section className="section">
                                <button className="button is-danger is-pulled-right">Delete course</button>
                                <button onClick={openTopicDialog} className="button is-success is-pulled-right">Add Content</button>
                            </section>
                        </ShowIf>
                        {lessonTopics.map(topic => (
                            <section key={topic.id} className="section">
                                <h3 className="title">{topic.title}</h3>
                                <h4 className="subtitle">{topic.description}</h4>
                                <p>{topic.summary}</p>
                                <br/>
                                <ContentEditor
                                    courseId={courseId}
                                    lessonId={selectedLesson.id}
                                    topic={topic}
                                    blocks={filteredBlocks(topic.id)}
                                    sendContent={sendContent}
                                />
                            </section>
                        ))}
                    </ShowIf>
                </div>

                <DeleteConfirmationModal ref={deleteModalRef} send={send} state={state}/>

                <TopicModal
                    courseId={courseId}
                    lessonId={selectedLesson ? selectedLesson.id : null}
                    sendTopic={sendTopic}
                    ref={addTopicModalRef}
                />
            </div>
        </>
    );
}
