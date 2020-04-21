import {MachineConfig} from "xstate";
import {LessonsContext, LessonsStateSchema} from "./lessons.machine.schema";
import {LessonsMachineEvents} from "./lessons.machine.events";

export const lessonsMachineConfig: MachineConfig<LessonsContext, LessonsStateSchema, LessonsMachineEvents> = {
    key: 'lessons-state',
    initial: 'initial',
    context: {
        items: [],
        currentItem: null,
    },
    states: {
        initial: {
            on: {
                FETCH_LESSONS: 'fetching',
                SAVE_LESSON: 'saving',
                DELETE_LESSON: 'deleting',
                UPDATE_LESSON: 'updating',
                FIND_LESSON: 'finding',
            }
        },
        fetching: {
            invoke: {
                src: 'getAll'
            },
            on: {
                FETCH_LESSONS_SUCCESS: {
                    target: 'initial',
                    actions: 'updateList'
                }
            }
        },
        saving: {
            invoke: {
                src: 'saveLesson'
            },
            on: {
                SAVE_LESSON_SUCCESS: {
                    target: 'saved',
                    actions: 'addLesson'
                }
            }
        },
        saved: {on: {'': {target: 'initial' }}},
        deleting: {
            invoke: {
                src: 'deleteLesson'
            },
            on: {
                DELETE_LESSON_SUCCESS: {
                    target: 'deleted',
                    actions: 'removeLesson'
                }
            }
        },
        deleted: {on: {'': {target: 'initial' }}},
        updating: {},
        updated: {on: {'': {target: 'initial' }}},
        finding: {
            invoke: {
                src: 'findLesson'
            },
            on: {
                FIND_LESSON_SUCCESS: {
                    target: 'found',
                    actions: 'setActive',
                }
            }
        },
        found: {on: {'': {target: 'initial'}}}
    }
};
