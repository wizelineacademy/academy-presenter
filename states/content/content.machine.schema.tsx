import {BlockContent} from "../../domain/content";

export interface ContentStateSchema {
    states: {
        initial: {},
        fetching: {},
        saving: {},
        saved: {},
        updating: {},
        updated: {},
        deleting: {},
        deleted: {}
    }
}

export interface ContentContext {
    items: BlockContent[];
    currentItem?: BlockContent;
}
