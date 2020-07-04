import React, {useEffect, useState} from "react";
import {Editor} from './content';
import {BlockContent} from "../domain/content";
import classnames from 'classnames';
import {DeleteContent, SaveContent, UpdateContent} from "../states/content/content.machine.events";
import {Code} from "./code";
import {Button} from './Button/Button';
import {TextArea} from './TextArea/TextArea';
import {TextField} from './TextField/TextField';
import IosDesktop from 'react-ionicons/lib/IosDesktop';
import IosDesktopOutline from 'react-ionicons/lib/IosDesktopOutline';
import IosTrashOutline from 'react-ionicons/lib/IosTrashOutline';
import IosCreateOutline from 'react-ionicons/lib/IosCreateOutline';

const isNew = (block: BlockContent): boolean => !Boolean(block.id);
const isText = (block: BlockContent): boolean => block.type === 'text';
const isCode = (block: BlockContent): boolean => block.type === 'code';
const isEmbed = (block: BlockContent): boolean => block.type === 'embed';

const getDefaultBlockContent = (courseId: string, topicId) => ({
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
    const changeToWrite = (block) => setCurrentBlock({...block, edit: true});
    const content = [];

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

    const updateCurrentBlockType = (type) => {
        setCurrentBlock({
            ...currentBlock,
            type,
            edit: true
        });
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

    const isTextNormalMode = (block: BlockContent) => {
        return isText(block) && block.content && !(block.id === currentBlock.id && !currentBlock.edit);
    }

    const isTextEditMod = (block: BlockContent) => {
        return Boolean(isText(block) && (block.id === currentBlock.id) && currentBlock.edit)
    }

    const isCodeNormalMode = (block: BlockContent) => {
        return isCode(block) && block.content && !(block.id === currentBlock.id && !currentBlock.edit);
    }
    const isCodeEditMode = (block: BlockContent) => {
        return isCode(block) && block.content && (block.id === currentBlock.id) && currentBlock.edit;
    }

    const isEmbedNormalMode = (block: BlockContent) => {
        return isEmbed(block) && block.content && !(block.id === currentBlock.id) && !currentBlock.edit;
    }

    const isEmbedEditMode = (block: BlockContent) => {
        return isEmbed(block) && block.content && (block.id === currentBlock.id) && currentBlock.edit;
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

    const getEditionControls = (block: BlockContent) => {
        return (
            <>
                <div className="flex items-center justify-end">
                    <Button
                        variant="danger"
                        className="mr-2"
                        onClick={cancelEditing}>
                        Cancel
                    </Button>
                    <Button
                        variant="primary"
                        disabled={block.id !== currentBlock.id && !currentBlock.edit}
                        onClick={saveOrUpdate}>
                        Save
                    </Button>
                </div>
            </>
        )
    }

    const getIsSlideControl = () => {
        return (
            <p className="control">
                <label className="checkbox">
                    <input
                        type="checkbox"
                        name="slide-block"
                        checked={currentBlock.isSlideBlock}
                        onChange={(evt) => markAsSlideBlock(evt.target.checked)}
                    />
                    Slide Block
                </label>
                {currentBlock.isSlideBlock && (
                    <label className="checkbox">
                        <input
                            type="checkbox"
                            name="slide-block"
                            checked={currentBlock.isLastSlideBlock}
                            onChange={(evt) => markAsIsLastSlideBlock(evt.target.checked)}
                        />
                        Last slide block element
                    </label>
                )}
            </p>
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

                    {isTextEditMod(block) && (
                        <div className="content-block content">
                            <div className="box">
                                {getIsSlideControl()}
                                <br/>
                                <Editor onChange={updateCurrentBlockContent} content={currentBlock.content} />
                                <br/>
                                {getEditionControls(block)}
                            </div>
                        </div>
                    )}

                    {isCodeEditMode(block) && (
                        <div className="content-block content">
                            <div className="box">
                                {getIsSlideControl()}
                                <TextArea
                                    name="content"
                                    cols={30}
                                    rows={10}
                                    className="editor__code"
                                    defaultValue={block.content}
                                    onChange={(evt) => updateCurrentBlockContent(evt.target.value)} />
                                {getEditionControls(block)}
                            </div>
                        </div>
                    )}

                    {isEmbedEditMode(block) && (
                        <>
                            {getIsSlideControl()}
                            <TextField
                                defaultValue={block.content}
                                onChange={(evt) => updateCurrentBlockContent(evt.target.value)}/>
                            <br/>
                            {getEditionControls(block)}
                            <br/>
                        </>
                    )}

                    {isTextNormalMode(block) && (
                        <>
                            {getNormalControls(block)}
                            <div className="text-gray-600" dangerouslySetInnerHTML={{__html: block.content}} />
                            <br/>
                        </>
                    )}

                    {isCodeNormalMode(block) && (
                        <>
                            {getNormalControls(block)}
                            <Code content={block.content} />
                            <br/>
                        </>
                    )}

                    {isEmbedNormalMode(block) && (
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
                {isAdmin && isNew(currentBlock) && currentBlock.type && (
                    <div className="px-3">
                        <div className="box">
                            <label className="checkbox">
                                <input
                                    type="checkbox"
                                    name="slide-block"
                                    onChange={(evt) => markAsSlideBlock(evt.target.checked)}
                                />
                                Slide Block
                            </label>
                            <br/>

                            {isText(currentBlock) && <Editor onChange={updateCurrentBlockContent} content={currentBlock.content} />}
                            {isCode(currentBlock) && (
                                <TextArea
                                    name="content"
                                    cols={100}
                                    rows={10}
                                    className="w-full overflow-auto"
                                    onChange={(evt) => updateCurrentBlockContent(evt.target.value)} />
                            )}
                            {isEmbed(currentBlock) && (
                                <TextField
                                    onChange={(evt) => updateCurrentBlockContent(evt.target.value)}
                                    placeholder="https://codesandbox.io/embed/jointjs-dom-graph-ykf1l?fontsize=14&hidenavigation=1&theme=dark&view=preview"
                                />
                            )}
                            <br/>
                            <div className="flex items-center justify-end mx-3">
                                <Button
                                    onClick={cancelEditing}
                                    className="mr-2">
                                    Cancel
                                </Button>
                                <Button
                                    onClick={saveOrUpdate}
                                    variant="primary">
                                    Save
                                </Button>
                            </div>
                            <div className="is-clearfix" />
                        </div>
                    </div>
                )}
            </>
        )
    }

    return (
        <>
            {content}
        </>
    );
}

export default ContentEditor;
