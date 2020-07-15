import React, {useEffect, useRef, useState} from "react";
import styled from 'styled-components';
import {Lesson} from "../../domain/lesson";
import Link from "next/link";
import {DeleteConfirmationModal} from "../modals/delete.confirmation.modal";
import {matchPastState} from "../../states/states.utils";
import {TopicModal} from "../modals/topic.modal";
import {Topic} from "../../domain/topic";
import dynamic from "next/dynamic";
import {BlockContent} from "../../domain/content";
import {Button} from '../Button/Button';
import IosClockOutline from 'react-ionicons/lib/IosClockOutline';
import MdPlay from 'react-ionicons/lib/MdPlay';
import IosTrashOutline from 'react-ionicons/lib/IosTrashOutline';
import MdAdd from 'react-ionicons/lib/MdAdd';

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

const ItemDiv = styled.div`
    &:hover {
    .controls {
    display: flex;
    }
    }

    .controls {
    display: none;
    }
`;

export const LessonList = (props: LessonListProps) => {
    const {
        lessons = [],
        topics=[],
        blocks = [],
        isAdmin = true,
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
    const [topicLessonsDict, setTopicLessonsDict] = useState({});
    const deleteModalRef = useRef(null);
    const addTopicModalRef = useRef(null);

    const isActive = (lesson: Lesson) => {
        return selectedLesson && lesson.id === selectedLesson.id;
    };

    const selectLesson = (e, lesson: Lesson) => {
        e.stopPropagation();

        if (!selectedLesson || selectedLesson !== lesson.id) {
            setSelectedLesson(lesson);
        } else if (selectedLesson && selectedLesson === lesson.id){
            setSelectedLesson(null);
        }
    };

    const mapTopics = () => {
        if (topics.length > 0) {
            const topicLessonsMap = topics.reduce((acc, topic) => {
                const lessonId = topic.lessonId
                if (!acc[lessonId]) {
                    acc[lessonId] = []
                }
                acc[lessonId].push(topic);
                return acc;
            }, {});
            console.log('topics', topicLessonsMap);
            setTopicLessonsDict(topicLessonsMap);
        }
    }

    const deleteLesson = (event, lesson: Lesson) => {
        event.stopPropagation();
        deleteModalRef.current.open({
            name: lesson.name,
            type: 'Course',
            entity: lesson
        });
    };

    const openTopicDialog = () => {
        addTopicModalRef.current.open();
    }

    const closeDeleteModalAfterDeleted = () => {
        if (state && matchPastState(state, 'deleting')) {
            deleteModalRef.current.close();
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

    useEffect(closeDeleteModalAfterDeleted, [state]);
    useEffect(closeAddTopicModalAfterAdded, [topicState]);
    useEffect(mapTopics, [topics])

    return (
        <>
            <DeleteConfirmationModal ref={deleteModalRef} send={send} state={state}/>

            <TopicModal
                courseId={courseId}
                lessonId={selectedLesson ? selectedLesson.id : null}
                sendTopic={sendTopic}
                ref={addTopicModalRef}
            />

            <div className="bg-white rounded">
                <div>
                    {lessons.map((lesson: Lesson, idx) => (
                        <ItemDiv className="lesson-list-item" key={lesson.id || idx}>
                            <a>
                                <div className="relatives">
                                    <div className="block rounded-lg py-3 px-5 flex items-center border border-t-0 border-l-0 border-r-0 bg-white">
                                        <div className="overflow-x-auto leading-relaxed">
                                            <h2 className="mr-2 text-5xl font-bold text-blue-600">
                                                {lesson.name}
                                            </h2>
                                            <p className="w-50 text-sm truncate whitespace-no-wrap overflow-x-auto">
                                                {lesson.summary}
                                            </p>
                                        </div>
                                        <div className="flex items-center controls">
                                            {isAdmin && (
                                                <>
                                                    <Button
                                                        variant="danger"
                                                        className="mr-2"
                                                        onClick={(evt) => deleteLesson(evt, lesson)}
                                                    >
                                                        <IosTrashOutline color={"white"}/>
                                                    </Button>
                                                    <Link href={`/slides/${lesson.id}?course=${courseId}`}>
                                                        <a target="_blank" rel="noopener noreferrer">
                                                            <Button><MdPlay /></Button>
                                                        </a>
                                                    </Link>
                                                </>
                                            )}
                                            <Button
                                                onClick={(e) => selectLesson(e, lesson)}
                                                className="ml-2"
                                            >
                                                <MdAdd />
                                            </Button>
                                        </div>
                                    </div>
                                    {(topicLessonsDict[lesson.id] && topicLessonsDict[lesson.id] || [new Topic()]).map((topic, idx) =>
                                        {
                                            if (isActive(lesson)) {
                                                return (
                                                    <div className={`py-6 px-5 bg-gray-100`} >
                                                        <section className="section leading-relaxed relative">
                                                            {idx === 0 && (
                                                                <p className="text-gray-600">
                                                                    <h5 className="text-xl text-blue-500">Summary:</h5>
                                                                    {lesson.summary}
                                                                    <button onClick={openTopicDialog}>Add topic bitch</button>
                                                                </p>
                                                            )}
                                                            {topic.id && (
                                                                <div key={topic.id} className="static">
                                                                    <h3 className="text-4xl">{topic.title}</h3>
                                                                    <h4 className="">{topic.description}</h4>
                                                                    <p className="text-gray-600">{topic.summary}</p>
                                                                    <br />
                                                                    <ContentEditor
                                                                        courseId={courseId}
                                                                        lessonId={lesson.id}
                                                                        topicId={topic.id}
                                                                        blocks={filteredBlocks(topic.id)}
                                                                        sendContent={sendContent}
                                                                        isAdmin={isAdmin}
                                                                    />
                                                                </div>
                                                            )}
                                                        </section>
                                                    </div>
                                                )
                                            }
                                        }
                                    )}
                                </div>
                            </a>
                        </ItemDiv>
                    ))}
                </div>
            </div>
        </>
    );
}
