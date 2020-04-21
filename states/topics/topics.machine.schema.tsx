import {Topic} from "../../domain/topic";

export interface TopicsStateSchema {
    states: {
        initial: {},
        fetching: {},
        saving: {},
        saved: {},
        finding: {},
        found: {},
    }
}

export interface TopicsContext {
    items: Topic[];
    currentItem?: Topic;
}
