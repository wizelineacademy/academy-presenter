import {MachineConfig} from "xstate";
import {CoursesContext, CoursesStateSchema} from "./courses.machine.schema";
import {CoursesMachineEvents} from "./courses.machine.events";

export const coursesMachineConfig: MachineConfig<CoursesContext, CoursesStateSchema, CoursesMachineEvents> = {
    key: 'courses-state',
    initial: 'initial',
    context: {
        items: [],
        currentItem: null,
    },
    states: {
        initial: {
            on: {
                FETCH_COURSES: 'fetching',
                SAVE_COURSE: 'saving',
                FIND_COURSE: 'finding',
            }
        },
        fetching: {
            invoke: {
                src: 'getAll'
            },
            on: {
                FETCH_COURSES_SUCCESS: {
                    target: 'initial',
                    actions: 'updateList'
                }
            }
        },
        saving: {
            invoke: {
                src: 'save',
            },
            on: {
                SAVE_COURSE_SUCCESS: {
                    target: 'saved',
                    actions: 'addCourse'
                }
            }
        },
        saved: {on: {'': {target: 'initial' }}},
        finding: {
            invoke: {
                src: 'find'
            },
            on: {
                FIND_COURSE_SUCCESS: {
                    target: 'found',
                    actions: 'setActive'
                }
            }
        },
        found: {on: {'': {target: 'initial' }}},
    }
};
