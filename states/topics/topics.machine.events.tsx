import {Topic} from "../../domain/topic";

export class FetchTopics {
    readonly type = 'FETCH_TOPICS';
    constructor(public courseId: string) {};
}

export class FetchTopicsSuccess {
    readonly type = 'FETCH_TOPICS_SUCCESS';
    constructor(public topics: Topic[]) {};
}

export class FetchTopicsFail {
    readonly type = 'FETCH_TOPICS_SUCCESS';
    constructor(public error: any) {};
}

export class SaveTopic {
    readonly type = 'SAVE_TOPIC';
    constructor(public topic: Topic) {};
}

export class SaveTopicSuccess {
    readonly type = 'SAVE_TOPIC_SUCCESS';
    constructor(public topic: Topic) {};
}

export class SaveTopicFail {
    readonly type = 'SAVE_TOPIC_FAIL';
    constructor(public error: any) {};
}

export class FindTopics {
    readonly type = 'FIND_TOPICS';
    constructor(public lessonId: string) {};
}

export class FindTopicsSuccess {
    readonly type = 'FIND_TOPICS_SUCCESS'
    constructor(public topics: Topic[]) {};
}

export class FindTopicsFail {
    readonly type = 'FIND_TOPICS_FAIL';
    constructor(public error: any) {};
}

export type TopicsMachineEvents = FetchTopics
    | FetchTopicsSuccess
    | FetchTopicsFail
    | SaveTopic
    | SaveTopicSuccess
    | SaveTopicFail
    | FindTopics
    | FindTopicsSuccess
    | FindTopicsFail;
