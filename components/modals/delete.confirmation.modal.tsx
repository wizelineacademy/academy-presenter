import React, {forwardRef} from "react";
import cx from 'classnames';
import {DeleteLesson} from "../../states/lessons/lessons.machine.events";
import {useModal} from "../../states/modal/modal.machine.service";
import {CloseModal, ShowModal} from "../../states/modal/modal.machine.events";
import {DeleteConfirmationModalProps, ModalOptions} from "../../domain/modal";

export const DeleteConfirmationModal = forwardRef(({send, state}: DeleteConfirmationModalProps, ref) => {
    const isDeleting = state && state.matches('deleting');
    const confirmButtonClasses = cx('button is-danger', {'is-loading': isDeleting});
    const [modalState, sendModal] = useModal();
    const modalClasses = cx('modal', {'is-active': modalState.matches('visible')});

    const closeModal = () => {
        sendModal(new CloseModal());
    };

    const showModal = (opts: ModalOptions) => {
        sendModal(new ShowModal(opts))
    };

    const itemDeleted = () => {
        send(new DeleteLesson(modalState.context.entity))
    };

    // @ts-ignore
    ref.current = {showModal, closeModal};

    return(
        <div className={modalClasses}>
            <div className="modal-background"/>
            <div className="modal-card">
                <header className="modal-card-head">
                    <p className="modal-card-title">Delete confirmation</p>
                    <button disabled={isDeleting} className="delete" aria-label="close" onClick={closeModal}/>
                </header>
                <section className="modal-card-body">
                    <h3 className="subtitle">
                        Are you sure that you want to delete the following {modalState.context.type}: <strong>{modalState.context.name}</strong>?
                    </h3>
                </section>
                <footer className="modal-card-foot is-right">
                    <button onClick={itemDeleted} className={confirmButtonClasses}>Delete</button>
                    <button disabled={isDeleting} onClick={closeModal} className="button">Cancel</button>
                </footer>
            </div>
        </div>
    );
})
