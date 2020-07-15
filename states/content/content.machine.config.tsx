import {MachineConfig} from "xstate";
import {ContentContext, ContentStateSchema} from "./content.machine.schema";
import {ContentMachineEvents} from "./content.machine.events";

export const contentMachineConfig: MachineConfig<ContentContext, ContentStateSchema, ContentMachineEvents> = {
    key: 'courses-state',
    initial: 'initial',
    context: {
        items: [],
        currentItem: null,
    },
    states: {
        initial: {
            on: {
                FETCH_CONTENT: 'fetching',
                SAVE_CONTENT: 'saving',
                UPDATE_CONTENT: 'updating',
                DELETE_CONTENT: 'deleting',
            }
        },
        fetching: {
            invoke: {
                src: 'getAll'
            },
            on: {
                FETCH_CONTENT_SUCCESS: {
                    target: 'initial',
                    actions: 'updateList'
                }
            }
        },
        saving: {
            invoke: {
                src: 'saveContent'
            },
            on: {
                SAVE_CONTENT_SUCCESS: {
                    target: 'saved',
                    actions: 'addContent'
                }
            }
        },
        updating: {
            invoke: {
                src: 'updateContent',
            },
            on: {
                UPDATE_CONTENT_SUCCESS: {
                    target: 'updated',
                    actions: 'updateContent'
                }
            }
        },
        deleting: {
            invoke: {
                src: 'deleteContent'
            },
            on: {
                DELETE_CONTENT_SUCCESS: {
                    target: 'deleted',
                    actions: 'removeContent'
                }
            }
        },
        deleted: {on: {'': {target: 'initial' }}},
        saved: {on: {'': {target: 'initial' }}},
        updated: {on: {'': {target: 'initial' }}},
    }
};
