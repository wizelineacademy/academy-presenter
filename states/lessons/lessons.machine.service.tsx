import {LessonsContext, LessonsStateSchema} from "./lessons.machine.schema";
import {assign, Machine} from "xstate";
import {
    DeleteLessonFail,
    DeleteLessonSuccess,
    FetchLessonsFail,
    FetchLessonsSuccess, FindLessonFail, FindLessonSuccess,
    LessonsMachineEvents, SaveLessonFail, SaveLessonSuccess
} from "./lessons.machine.events";
import {lessonsMachineConfig} from "./lessons.machine.config";
import {MachineOptions} from "xstate/lib/types";
import {useContext} from "react";
import {ServiceContext} from "../../context/service.context";
import {catchError, map, take} from "rxjs/operators";
import {Lesson} from "../../domain/lesson";
import {useMachine} from "@xstate/react/lib";
import {of} from "rxjs";

export const useLessons = () => {
    const {lessonsService} = useContext(ServiceContext);
    const lessonMachineOptions: Partial<MachineOptions<LessonsContext, LessonsMachineEvents>> = {
        services: {
            getAll: (_, event) => {
                return lessonsService.getAll(event.courseId).pipe(
                    take(1),
                    map((snapshot) => {
                        const lessons: Lesson[] = snapshot.exists() ? Object.values(snapshot.val()) : [];
                        return new FetchLessonsSuccess(lessons);
                    }),
                    catchError(e => of(new FetchLessonsFail(e)))
                );
            },
            saveLesson: (_, event) => {
                return lessonsService.save(event.lesson).pipe(
                    take(1),
                    map(() => new SaveLessonSuccess(event.lesson)),
                    catchError(e => of(new SaveLessonFail(e)))
            )
            },
            deleteLesson: (_, event) => {
                return lessonsService.remove(event.lesson).pipe(
                    take(1),
                    map(() => new DeleteLessonSuccess(event.lesson)),
                    catchError(e => of(new DeleteLessonFail(e)))
                );
            },
            findLesson: (_, event) => {
                return lessonsService.find(event.lessonId).pipe(
                    take(1),
                    map((snapshot) => new FindLessonSuccess(snapshot.val())),
                    catchError(e => of(new FindLessonFail(e)))
                )
            }
        },
        actions: {
            updateList: assign<LessonsContext, FetchLessonsSuccess>((_, event) => ({
                items: event.lessons
            })),
            removeLesson: assign<LessonsContext, DeleteLessonSuccess>((ctx, event) => ({
                items: ctx.items.filter(lesson => lesson.id !== event.lesson.id)
            })),
            addLesson: assign<LessonsContext, SaveLessonSuccess>((ctx, event) => ({
                items: [...ctx.items, event.lesson]
            })),
            setActive: assign<LessonsContext, FindLessonSuccess>((_, event) => ({
                currentItem: event.lesson
            }))
        }
    };

    const lessonStateMachine = Machine<LessonsContext, LessonsStateSchema, LessonsMachineEvents>(lessonsMachineConfig)
        .withConfig(lessonMachineOptions);

    return useMachine(lessonStateMachine);
}
