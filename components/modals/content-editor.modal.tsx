import React, { forwardRef, useRef, useState, useEffect } from "react";
import { ModalOptions } from "../../domain/modal";
import { Modal } from './Modal';
import { Editor } from "@components/content";
import { TextField } from "@components/TextField/TextField";
import { TextArea } from "@components/TextArea/TextArea";
import { BlockContent } from "@domain/content";

export type ContentEditorModalProps = {
    block?: BlockContent;
    onSave: (block: BlockContent) => void;
}

const modalTitle = {
    'text': 'Text Content',
    'code': 'Code Content',
    'embed': 'Embed Content',
}

export const ContentEditorModal = forwardRef(({ onSave }: ContentEditorModalProps, ref) => {
    const [block, setBlockToSave] = useState<BlockContent | null>(null);
    const title = modalTitle[block ? block.type : 'text'];
    const modalRef = useRef();

    const updateCurrentBlockContent = (content: string) => {
        setBlockToSave({
            ...block,
            content
        })
    };

    const markAsSlideBlock = (checked: boolean) => {
        setBlockToSave({...block, isSlideBlock: checked});
    }

    const markAsIsLastSlideBlock = (checked: boolean) => {
        setBlockToSave({...block, isLastSlideBlock: checked});
    }

    const open = (opts: ModalOptions) => {
        setBlockToSave({...opts.entity});
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
                    onChange={(content) => updateCurrentBlockContent(content)}
                    content={block.content}
                />
            )
        }
    }

    return (
        <Modal title={title} ref={modalRef} sizeLarge onConfirmAction={() => onSave(block)} >
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
