import React, {forwardRef, useRef} from "react";
import {DeleteLesson} from "../../states/lessons/lessons.machine.events";
import {DeleteConfirmationModalProps} from "../../domain/modal";
import {Modal} from './Modal';

export const DeleteConfirmationModal = forwardRef(({send, state}: DeleteConfirmationModalProps, ref) => {
    const isDeleting = state && state.matches('deleting');
    const modalRef = useRef();

    const open = (opts: ModalOptions) => {
        modalRef.current.open(opts);
    }

    const close = () => {
        modalRef.current.close();
    }

    const deleteItem = (item) => {
        send(new DeleteLesson(item))
    };


    // @ts-ignore
    if (ref) {
        ref.current = {open, close};
    }

    return(
        <Modal isDeleting={isDeleting} onItemDeleted={deleteItem} ref={modalRef}>
            <p>
                Are you sure that you want to delete the following item?
            </p>
        </Modal>
    );
})
