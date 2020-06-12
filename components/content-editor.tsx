import React, {useEffect, useState} from "react";
import {Editor} from './content';
import {BlockContent} from "../domain/content";
import classnames from 'classnames';
import {DeleteContent, SaveContent, UpdateContent} from "../states/content/content.machine.events";
import {Code} from "./code";

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

export const ContentEditor = ({lessonId, courseId, topic, blocks = [], sendContent}) => {
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
            <div className="field has-addons is-pulled-right border-1 content__controls-normal">
                <p className="control">
                    <button className="button is-outlined is-small is-danger" onClick={() => deleteContent(block.id)}>Delete</button>
                </p>
                <p className="control">
                    <button disabled={currentBlock.id === block.id && currentBlock.edit} onClick={() => changeToWrite(block)} className="button is-info is-outlined is-small">Edit</button>
                </p>
            </div>
        );
    }

    const getEditionControls = (block: BlockContent) => {
        return (
            <>
                <div className="field has-addons is-pulled-right border-1">
                    <p className="control">
                        <button
                            onClick={cancelEditing}
                            className="button is-info is-outlined is-small">
                            Cancel
                        </button>
                    </p>
                    <p className="control">
                        <button
                            disabled={block.id !== currentBlock.id && !currentBlock.edit}
                            onClick={saveOrUpdate}
                            className="button is-outlined is-small is-info">
                            Save
                        </button>
                    </p>
                </div>
                <div className="is-clearfix" />
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
                <div className="content">
                    {isNew(block) && (
                        <div className="content-block content">
                            <div className="box">
                                <div className="buttons is-centered">
                                    <button
                                        className="button"
                                        onClick={() => updateCurrentBlockType('code')}
                                    >
                                        Code
                                    </button>
                                    <button
                                        className="button"
                                        onClick={() => updateCurrentBlockType('text')}
                                    >
                                        Text
                                    </button>
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
                                <textarea
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
                            <input
                                className="input"
                                type="text"
                                defaultValue={block.content}
                                onChange={(evt) => updateCurrentBlockContent(evt.target.value)}/>
                            <br/>
                            {getEditionControls(block)}
                            <br/>
                        </>
                    )}

                    {isTextNormalMode(block) && (
                        <div className="is-relative">
                            {getNormalControls(block)}
                            <div className={classnames('content', {'is-slide-block': block.isSlideBlock})} dangerouslySetInnerHTML={{__html: block.content}} />
                            <br/>
                        </div>
                    )}

                    {isCodeNormalMode(block) && (
                        <div className="is-relative">
                            {getNormalControls(block)}
                            <Code isSlideBlock={block.isSlideBlock} content={block.content} />
                            <br/>
                        </div>
                    )}

                    {isEmbedNormalMode(block) && (
                        <>
                        <div className={classnames("is-relative", {'is-slide-block': block.isSlideBlock})}>
                            {getNormalControls(block)}
                            <embed className="code__embed" src={block.content} />
                        </div>
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
                {currentBlock.type === null && (
                    <div className="content-block content">
                        <div className="box">
                            <div className="buttons is-centered">
                                <button
                                    className="button"
                                    onClick={() => updateCurrentBlockType('code')}
                                >
                                    Code
                                </button>
                                <button
                                    className="button"
                                    onClick={() => updateCurrentBlockType('text')}
                                >
                                    Text
                                </button>
                                <button
                                    className="button"
                                    onClick={() => updateCurrentBlockType('embed')}
                                >
                                    Embed URL
                                </button>
                            </div>
                        </div>
                    </div>
                )}
                {isNew(currentBlock) && currentBlock.type && (
                    <div className="content-block content">
                        <div className="box">
                            <label className="checkbox">
                                <input type="checkbox" name="slide-block" onChange={(evt) => markAsSlideBlock(evt.target.checked)}/>
                                Slide Block
                            </label>
                            <br/>
                            {isText(currentBlock) && <Editor onChange={updateCurrentBlockContent} content={currentBlock.content} />}
                            {isCode(currentBlock) && (
                                <textarea
                                    name="content"
                                    cols={30}
                                    rows={10}
                                    className="code"
                                    onChange={(evt) => updateCurrentBlockContent(evt.target.value)} />
                            )}
                            {isEmbed(currentBlock) && (
                                <input
                                    className="input"
                                    type="text"
                                    onChange={(evt) => updateCurrentBlockContent(evt.target.value)}/>
                            )}
                            <br/>
                            <div className="field has-addons is-pulled-right border-1">
                                <p className="control">
                                    <button
                                        onClick={cancelEditing}
                                        className="button is-info is-outlined is-small">
                                        Cancel
                                    </button>
                                </p>
                                <p className="control">
                                    <button onClick={saveOrUpdate} className="button is-outlined is-small is-info">Save</button>
                                </p>
                            </div>
                            <div className="is-clearfix" />
                        </div>
                    </div>
                )}
            </>
        )
    }

    return (<>{content}</>);
}

export default ContentEditor;
