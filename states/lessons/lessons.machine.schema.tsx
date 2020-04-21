import {Lesson} from "../../domain/lesson";

export interface LessonsStateSchema {
    states: {
        initial: {},
        fetching: {},
        deleting: {},
        deleted: {},
        updating: {},
        updated: {},
        saving: {},
        saved: {},
        finding: {},
        found: {}
    }
}

export interface LessonsContext {
    items: Lesson[];
    currentItem?: Lesson;
}
