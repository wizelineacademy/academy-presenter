import {BlockContent} from "../../domain/content";

export class FetchContent {
    readonly type = 'FETCH_CONTENT';
    constructor(public topicId: string) {}
}

export class FetchContentSuccess {
    readonly type = 'FETCH_CONTENT_SUCCESS';
    constructor(public blocks: BlockContent[]) {}
}

export class FetchContentFail {
    readonly type = 'FETCH_CONTENT_FAIL';
    constructor(public error: any) {}
}

export class SaveContent {
    readonly type = 'SAVE_CONTENT';
    constructor(public content: BlockContent) {}
}

export class SaveContentSuccess {
    readonly type = 'SAVE_CONTENT_SUCCESS';
    constructor(public content: BlockContent) {}
}

export class SaveContentFail {
    readonly type = 'SAVE_CONTENT_FAIL';
    constructor(public error: any) {}
}

export class UpdateContent {
    readonly type = 'UPDATE_CONTENT';
    constructor(public content: BlockContent) {}
}

export class UpdateContentSuccess {
    readonly type = 'UPDATE_CONTENT_SUCCESS';
    constructor(public content: BlockContent) {}
}

export class UpdateContentFail {
    readonly type = 'UPDATE_CONTENT_FAIL';
    constructor(public error: any) {}
}

export class DeleteContent {
    readonly type = 'DELETE_CONTENT';
    constructor(public contentId: string) {}
}

export class DeleteContentSuccess {
    readonly type = 'DELETE_CONTENT_SUCCESS';
    constructor(public contentId: string) {}
}
export class DeleteContentFail {
    readonly type = 'DELETE_CONTENT_FAIL';
    constructor(public error: any) {}
}

export type ContentMachineEvents = FetchContent
    | FetchContentSuccess
    | FetchContentFail
    | SaveContent
    | SaveContentSuccess
    | SaveContentFail
    | UpdateContent
    | UpdateContentSuccess
    | UpdateContentFail
    | DeleteContent
    | DeleteContentSuccess
    | DeleteContentFail;

