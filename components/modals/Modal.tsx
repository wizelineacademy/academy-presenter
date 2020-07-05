import React, {forwardRef} from "react";
import {useModal} from "../../states/modal/modal.machine.service";
import {CloseModal, ShowModal} from "../../states/modal/modal.machine.events";
import {ModalOptions} from "../../domain/modal";
import {Button} from '../../components/Button/Button';

export const Modal = forwardRef(({
    children,
    isProcessing,
    onConfirmAction,
    title = 'Delete confirmation',
    confirmLabel = 'Apply',
    hideControls = false
}, ref) => {
    const [modalState, sendModal] = useModal();
    const isActive = !modalState.matches('hidden');

    const closeModal = () => {
        sendModal(new CloseModal());
    };

    const showModal = (opts: ModalOptions) => {
        sendModal(new ShowModal(opts))
    };

    const confirmAction = () => {
        onConfirmAction(modalState.context.entity);
    };


    if (ref) {
        ref.current = { open: showModal, close: closeModal };
    }

    if (!isActive) {
        return null;
    }

    return (
        <div className="fixed inset-0">
            <div className="bg-black opacity-50 absolute inset-0 z-10" />
            <div className="z-20 absolute inset-0 flex items-center">
                <div className="w-full max-w-lg mx-auto text-left">
                    <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                        <p className="text-2xl">{title}</p>
                        <section className="py-3">
                            {children}
                        </section>
                        {!hideControls && (
                            <footer className="w-full flex items-center justify-end mt-3">
                                <Button disabled={isProcessing} className="mr-2" onClick={closeModal}>Cancel</Button>
                                <Button onClick={confirmAction} variant="danger" loading={isProcessing}>{confirmLabel}</Button>
                            </footer>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
});
