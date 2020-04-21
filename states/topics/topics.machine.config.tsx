import {MachineConfig} from "xstate";
import {TopicsContext, TopicsStateSchema} from "./topics.machine.schema";
import {TopicsMachineEvents} from "./topics.machine.events";

export const topicsMachineConfig: MachineConfig<TopicsContext, TopicsStateSchema, TopicsMachineEvents> = {
    key: 'topics-state',
    initial: 'initial',
    context: {
        items: [],
        currentItem: null,
    },
    states: {
        initial: {
            on: {
                FETCH_TOPICS: 'fetching',
                SAVE_TOPIC: 'saving',
                FIND_TOPICS: 'finding',
            }
        },
        fetching: {
            invoke: {
                src: 'getAll'
            },
            on: {
                FETCH_TOPICS_SUCCESS: {
                    target: 'initial',
                    actions: 'updateList'
                }
            }
        },
        saving: {
            invoke: {
                src: 'saveTopic'
            },
            on: {
                SAVE_TOPIC_SUCCESS: {
                    target: 'saved',
                    actions: 'addTopic'
                }
            }
        },
        saved: {on: {'': {target: 'initial' }}},
        finding: {
            invoke: {
                src: 'findTopics'
            },
            on: {
                FIND_TOPICS_SUCCESS: {
                    target: 'found',
                    actions: 'updateList'
                }
            }
        },
        found: {on: {'': {target: 'initial' }}},
    }
};
