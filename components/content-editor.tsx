import React, {useRef, useState} from "react";
import {BlockContent} from "../domain/content";
import {DeleteContent, SaveContent, UpdateContent} from "../states/content/content.machine.events";
import {Code} from "./code";
import {Button} from './Button/Button';
import IosDesktop from 'react-ionicons/lib/IosDesktop';
import IosDesktopOutline from 'react-ionicons/lib/IosDesktopOutline';
import IosTrashOutline from 'react-ionicons/lib/IosTrashOutline';
import IosCreateOutline from 'react-ionicons/lib/IosCreateOutline';
import { ContentEditorModal } from "./modals/content-editor.modal";

const isNew = (block: BlockContent): boolean => !Boolean(block.id);
const isText = (block: BlockContent): boolean => block.type === 'text';
const isCode = (block: BlockContent): boolean => block.type === 'code';
const isEmbed = (block: BlockContent): boolean => block.type === 'embed';

const getDefaultBlockContent = (courseId: string, topicId): BlockContent & {edit: boolean} => ({
    content: '',
    type: null,
    id: null,
    position: 0,
    edit: false,
    isSlideBlock: false,
    isLastSlideBlock: false,
    courseId: courseId as string,
    topicId,
})

export const ContentEditor = ({lessonId, courseId, topic, blocks = [], sendContent, isAdmin}) => {
    const [currentBlock, setCurrentBlock] = useState(getDefaultBlockContent(courseId as string, topic.id));
    const content = [];
    const modalRef = useRef();

    const saveOrUpdate = () => {
        if (isNew(currentBlock)) {
            // We create a new content
            const {edit, ...content} = currentBlock;
            sendContent(new SaveContent({
                ...content,
                topicId: topic.id,
                courseId: courseId as string,
                position: blocks.length
            }))
        } else {
            // Update an existing item
            const {edit, ...content} = currentBlock;
            sendContent(new UpdateContent(content))
        }

        cancelEditing();
    };

    const cancelEditing = () => {
        setCurrentBlock(getDefaultBlockContent(courseId as string, topic.id));
    }

    const changeToWrite = (block) => {
        setCurrentBlock(block);
        modalRef.current.open();
    }

    const updateCurrentBlockType = (type) => {
        setCurrentBlock({
            ...currentBlock,
            type,
        });
        modalRef.current.open();
    }

    const updateCurrentBlockContent = (content) => {
        setCurrentBlock({...currentBlock, content});
    }

    const markAsSlideBlock = (checked) => {
        setCurrentBlock({...currentBlock, isSlideBlock: checked});
    }

    const markAsIsLastSlideBlock = (checked) => {
        setCurrentBlock({...currentBlock, isLastSlideBlock: checked});
    }

    const deleteContent = (id: string) => {
        sendContent(new DeleteContent(id))
    }

    const getNormalControls = (block: BlockContent) => {
        return (
            <>
                <div className="absolute left-0 top-0 right-0 flex justify-end bg-transparent hover:opacity-0">
                    <Button>
                        {block.isSlideBlock ? <IosDesktop color="purple"/> : <IosDesktopOutline />}
                    </Button>
                </div>
                <div className="absolute left-0 top-0 right-0 flex justify-end bg-transparent bg-opacity-75 opacity-0 hover:opacity-100">
                    <Button
                        className="mr-2"
                        onClick={() => deleteContent(block.id)}><IosTrashOutline /></Button>
                    <Button
                        className="mr-2"
                        disabled={currentBlock.id === block.id && currentBlock.edit}
                        onClick={() => changeToWrite(block)}>
                        <IosCreateOutline />
                    </Button>
                    <Button>
                        {block.isSlideBlock ? <IosDesktop color="purple"/> : <IosDesktopOutline />}
                    </Button>
                </div>
            </>
        );
    }

    blocks.forEach((block: BlockContent, index) => {
        content.push(
            <div key={`block-${index}`} className="content__wrapper">
                <div className="relative">
                    {isNew(block) && (
                        <div className="content-block content">
                            <div className="box">
                                <div className="buttons is-centered">
                                    <Button
                                        className="mr-2"
                                        onClick={() => updateCurrentBlockType('code')}
                                    >
                                        Code
                                    </Button>
                                    <Button
                                        className="mr-2"
                                        onClick={() => updateCurrentBlockType('text')}
                                    >
                                        Text
                                    </Button>
                                </div>
                            </div>
                        </div>
                    )}

                    {isText(block) && (
                        <>
                            {getNormalControls(block)}
                            <div className="text-gray-600" dangerouslySetInnerHTML={{__html: block.content}} />
                            <br/>
                        </>
                    )}

                    {isCode(block) && (
                        <>
                            {getNormalControls(block)}
                            <Code content={block.content} />
                            <br/>
                        </>
                    )}

                    {isEmbed(block) && (
                        <>
                            {getNormalControls(block)}
                            <embed className="code__embed" src={block.content} />
                            <br/>
                        </>
                    )}
                </div>
            </div>
        )
    });

    if (blocks.length === content.length) {
        content.push(
            <>
                {isAdmin && currentBlock.type === null && (
                    <div className="rounded">
                        <div className="flex items-center justify-center p-3">
                            <Button
                                className="mr-2"
                                onClick={() => updateCurrentBlockType('code')}
                            >
                                Code
                            </Button>
                            <Button
                                className="mr-2"
                                onClick={() => updateCurrentBlockType('text')}
                            >
                                Text
                            </Button>
                            <Button
                                className="button"
                                onClick={() => updateCurrentBlockType('embed')}
                            >
                                Embed URL
                            </Button>
                        </div>
                    </div>
                )}
            </>
        )
    }

    return (
        <div className="z-10 relative">
            {content}
            <ContentEditorModal ref={modalRef} block={currentBlock} />
        </div>
    );
}

export default ContentEditor;
