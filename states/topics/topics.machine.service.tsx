import {assign, Machine} from "xstate";
import {MachineOptions} from "xstate/lib/types";
import {useContext} from "react";
import {ServiceContext} from "../../context/service.context";
import {catchError, map, take} from "rxjs/operators";
import {useMachine} from "@xstate/react/lib";
import {of} from "rxjs";
import {TopicsContext, TopicsStateSchema} from "./topics.machine.schema";
import {
    FetchTopicsFail,
    FetchTopicsSuccess, FindTopicsFail, FindTopicsSuccess,
    SaveTopicFail,
    SaveTopicSuccess,
    TopicsMachineEvents
} from "./topics.machine.events";
import {Topic} from "../../domain/topic";
import {topicsMachineConfig} from "./topics.machine.config";

export const useTopics = () => {
    const {topicsService} = useContext(ServiceContext);
    const lessonMachineOptions: Partial<MachineOptions<TopicsContext, TopicsMachineEvents>> = {
        services: {
            getAll: (_, event) => {
                return topicsService.getAll(event.courseId).pipe(
                    take(1),
                    map((snapshot) => {
                        const topics: Topic[] = snapshot.exists() ? Object.values(snapshot.val()) : [];
                        return new FetchTopicsSuccess(topics);
                    }),
                    catchError(e => of(new FetchTopicsFail(e)))
                );
            },
            saveTopic: (_, event) => {
                return topicsService.save(event.topic).pipe(
                    take(1),
                    map(() => new SaveTopicSuccess(event.topic)),
                    catchError(e => of(new SaveTopicFail(e)))
                )
            },
            findTopics: (_, event) => {
                return topicsService.find(event.lessonId).pipe(
                    take(1),
                    map((snapshot) => {
                        const topics: Topic[] = snapshot.exists() ? Object.values(snapshot.val()) : [];
                        return new FindTopicsSuccess(topics)
                    }),
                    catchError(e => of (new FindTopicsFail(e)))
                )
            }
        },
        actions: {
            updateList: assign<TopicsContext, FetchTopicsSuccess>((_, event) => ({
                items: event.topics
            })),
            addTopic: assign<TopicsContext, SaveTopicSuccess>((ctx, event) => ({
                items: [...ctx.items, event.topic]
            })),
        }
    };

    const lessonStateMachine = Machine<TopicsContext, TopicsStateSchema, TopicsMachineEvents>(topicsMachineConfig)
        .withConfig(lessonMachineOptions);

    return useMachine(lessonStateMachine);
}
