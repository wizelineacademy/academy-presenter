import React, { forwardRef, useRef } from "react";
import { ModalOptions } from "../../domain/modal";
import { Modal } from './Modal';
import { Editor } from "@components/content";
import { TextField } from "@components/TextField/TextField";
import { TextArea } from "@components/TextArea/TextArea";
import { BlockContent } from "@domain/content";

export type ContentEditorModalProps = {
    send?: any;
    block?: BlockContent;
}

const modalTitle = {
    'text': 'Text Content',
    'code': 'Code Content',
    'embed': 'Embed Content',
}

export const ContentEditorModal = forwardRef(({ send, block }: ContentEditorModalProps, ref) => {
    const title = modalTitle[block ? block.type : 'text'];
    const markAsSlideBlock = (state: boolean) => { };
    const markAsIsLastSlideBlock = (state: boolean) => { };
    const updateCurrentBlockContent = (evt) => {};

    const modalRef = useRef();

    const open = (opts: ModalOptions) => {
        modalRef.current.open(opts);
    }

    const close = () => {
        modalRef.current.close();
    }

    // @ts-ignore
    if (ref) {
        ref.current = { open, close };
    }

    const getEditor = () => {
        if (block.type === 'embed') {
            return (
                <TextField
                    defaultValue={block.content}
                    label="Put your embed URL here:"
                    placeholder="https://codesandbox.io/s/y2lrywpk21"
                    onChange={(evt) => updateCurrentBlockContent(evt.target.value)}
                />
            );
        }
        if (block.type === 'code') {
            return (
                <TextArea
                    errors=""
                    name="content"
                    cols={30}
                    rows={10}
                    className="editor__code"
                    defaultValue={block.content}
                    onChange={(evt) => updateCurrentBlockContent(evt.target.value)} />
            )
        }

        if (block.type === 'text') {
            return (
                <Editor
                    onChange={(evt) => updateCurrentBlockContent(evt.target.value)}
                    content={block.content}
                />
            )
        }
    }

    return (
        <Modal title={title} ref={modalRef} sizeLarge>
            <div className="flex">
                <div className="w-3/4">
                    {block && getEditor()}
                </div>
                <div className="flex flex-col ml-3">
                    <div>
                        <label>
                            <input
                                type="checkbox"
                                name="slide-block"
                                className="mr-2"
                                checked={block && block.isSlideBlock}
                                onChange={(evt) => markAsSlideBlock(evt.target.checked)}
                            />
                    Slide 
                        </label>
                    </div>
                    {block && block.isSlideBlock && (
                        <div>
                            <label>
                                <input
                                    type="checkbox"
                                    name="slide-block"
                                    className="mr-2"
                                    checked={block && block.isLastSlideBlock}
                                    onChange={(evt) => markAsIsLastSlideBlock(evt.target.checked)}
                                />
                        Last Slide
                            </label>
                        </div>
                    )}
                </div>
            </div>
        </Modal>
    );
})
