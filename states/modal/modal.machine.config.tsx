import {MachineConfig} from "xstate";
import {ModalContext, ModalStateMachine} from "./modal.machine.schema";
import {ModalMachineEvents} from "./modal.machine.events";

export const modalMachineConfig: MachineConfig<ModalContext, ModalStateMachine, ModalMachineEvents> = {
    key: 'modal-state',
    initial: 'hidden',
    context: {
        name: '',
        type: '',
        entity: {},
    },
    states: {
        visible: {
            on: {
                CLOSE_MODAL: {
                    target: 'hidden',
                    actions: 'resetOptions'
                }
            },
        },
        hidden: {
            on: {
                SHOW_MODAL: {
                    target: 'visible',
                    actions: 'updateOptions'
                }
            }
        },
    }
};
