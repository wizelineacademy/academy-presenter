import {useMachine} from "@xstate/react/lib";
import {assign, Machine} from "xstate";
import {ModalContext} from "./modal.machine.schema";
import {ModalMachineEvents, ShowModal} from "./modal.machine.events";
import {modalMachineConfig} from "./modal.machine.config";
import {MachineOptions} from "xstate/lib/types";

export const useModal = () => {
    const modalMachineOptions: Partial<MachineOptions<ModalContext, ModalMachineEvents>> = {
        actions: {
            updateOptions: assign<ModalContext, ShowModal>((_, event) => ({
                ...event.modalOptions,
            })),
            resetOptions: assign<ModalContext, ShowModal>((_, event) => ({
                name: '',
                type: '',
                entity: {},
            })),
        }
    };

    const lessonStateMachine = Machine<ModalContext, ModalMachineEvents>(modalMachineConfig)
        .withConfig(modalMachineOptions);

    return useMachine(lessonStateMachine);
}
