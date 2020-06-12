import {useEffect} from 'react';
import classnames from 'classnames';
import dynamic from "next/dynamic";
import {TitleSlideOptionOne} from '../../components/slides/title-slide-option-1';
import {ContentSlide} from "../../components/slides/content-slide";
import {Agenda} from "../../components/slides/agenda-slide";
import {Sandbox} from "../../components/sandbox";
import {useRouter} from "next/router";
import {FindTopics} from "../../states/topics/topics.machine.events";
import {ShowIf} from "../../components/show-if";
import {useTopics} from "../../states/topics/topics.machine.service";
import {Loader} from "../../components/loader";
import {Topic} from "../../domain/topic";
import {useLessons} from "../../states/lessons/lessons.machine.service";
import {FindLesson} from "../../states/lessons/lessons.machine.events";
import {useContent} from "../../states/content/content.machine.service";
import {FetchContent} from "../../states/content/content.machine.events";
import {BlockContent} from "../../domain/content";

const Layout = dynamic(() => import('../../components/layout'), {ssr: false});

// Duplicated in content.machine.service.tsx file
const byPosition = (a: BlockContent, b: BlockContent) => {
    if (a.position < b.position) {
        return -1;
    }
    if (a.position > b.position) {
        return  1;
    }
};

export default function () {
    const router = useRouter()
    const {lessonId, course: courseId} = router.query;
    const [topicState, sendTopic] = useTopics();
    const [lessonsState, sendLesson] = useLessons();
    const [contentState, sendContent] = useContent();
    const isTopicLoading = topicState.matches('fetching');
    const isCourseLoading = lessonsState.matches('finding');
    const isContentLoading = contentState.matches('fetching');
    const isLoading = isTopicLoading || isCourseLoading || isContentLoading;
    const topics: Topic[] = topicState.context.items;
    const {currentItem: lesson} = lessonsState.context;
    const {items: blocks} = contentState.context;


    const fetchContent = () => {
        if (lessonId && courseId) {
            console.log('fetching lesson, topics and course info');
            sendTopic(new FindTopics(lessonId as string))
            sendLesson(new FindLesson(lessonId as string));
            sendContent(new FetchContent(courseId as string));
        }
    }

    const getContentBlocks = (topicId: string) => {
        const bySlideBlock = block => block.topicId === topicId && block.isSlideBlock;
        const toSectionBlocks = (acc, block) => {
            if (!acc.blocks[acc.pos]) {
                acc.blocks[acc.pos] = [];
            }

            acc.blocks[acc.pos].push(block);

            if (block.isLastSlideBlock) {
                acc.pos += 1;
            }

            return acc;
        }

        const blocksSection = [...blocks]
            .filter(bySlideBlock)
            .sort(byPosition)
            .reduce(toSectionBlocks, {blocks: [], pos: 0});
        return blocksSection.blocks;
    }

    useEffect(fetchContent, [lessonId, courseId]);

    const getContentByType = (block, divided = false) => {
        if (block.type === 'text') {
            return <div className="content" dangerouslySetInnerHTML={{__html: block.content}} />
        }
        if (block.type === 'code') {
            return (
                <div className={classnames({'w-50': divided, 'w-100': !divided})}>
                    <pre>
                        <code data-trim
                              className="hljs">
                            {block.content}
                        </code>
                    </pre>
                </div>
            );
        }
        if (block.type === 'embed') {
            return <Sandbox src={block.content} divided={Boolean(divided)} />
        }
    }

    const getContentFromTopic = (topicId: string, title: string) => {
        const blockSectionList = getContentBlocks(topicId)

        return blockSectionList.map(blockSection => {
            // One single block
            if (blockSection.length === 1) {
                return (
                    <ContentSlide title={title}>
                        {getContentByType(blockSection[0])}
                    </ContentSlide>
                );
            }

            // Two blocks
            if (blockSection.length === 2) {
                return (
                    <ContentSlide title={blockSection[0].showTitle ? title : ''}>
                        {getContentByType(blockSection[0])}
                        <div className="flex">
                            {getContentByType(blockSection[1])}
                        </div>
                    </ContentSlide>
                );
            }

            // Three blocks
            if (blockSection.length === 3) {
                return (
                    <ContentSlide title={blockSection[0].showTitle ? title : ''}>
                        {getContentByType(blockSection[0])}
                        <div className="flex">
                            {getContentByType(blockSection[1], true)}
                            {getContentByType(blockSection[2], true)}
                        </div>
                    </ContentSlide>
                );
            }
            return null;
        });
    }

    return (
        <>
            <Loader isLoading={isLoading} />
            <ShowIf condition={!isLoading}>
                <Layout>
                    <TitleSlideOptionOne title={lesson && lesson.name} author={lesson && lesson.speaker}/>
                    <Agenda topics={topics}/>
                    {topics.map(topic=> getContentFromTopic(topic.id, topic.title))}
                </Layout>
            </ShowIf>
        </>
    );
}
