import {useMachine} from "@xstate/react/lib";
import {assign, Machine, MachineOptions} from "xstate";
import {CoursesContext, CoursesStateSchema} from "./courses.machine.schema";
import {
    CoursesMachineEvents,
    FetchCoursesFail,
    FetchCoursesSuccess, FetchUserCoursesFail, FetchUserCoursesSuccess, FindCourseFail, FindCourseSuccess,
    SaveCourseFail,
    SaveCourseSuccess
} from "./courses.machine.events";
import {useContext} from "react";
import {ServiceContext} from "../../context/service.context";
import {catchError, map, take} from "rxjs/operators";
import Course from "../../domain/course";
import {of} from "rxjs";
import {coursesMachineConfig} from "./courses.machine.config";


export const useCourses = () => {
    const {coursesService} = useContext(ServiceContext);
    const lessonMachineOptions: Partial<MachineOptions<CoursesContext, CoursesMachineEvents>> = {
        services: {
            getAll: (_, event) => {
                return coursesService.getAll().pipe(
                    take(1),
                    map((snapshot: firebase.database.DataSnapshot) => {
                        const courses: Course[] = snapshot.exists() ? Object.values(snapshot.val()) : [];
                        return new FetchCoursesSuccess(courses);
                    }),
                    catchError(e => of(new FetchCoursesFail(e)))
                );
            },
            getAllByUser: (_, event) => {
                return coursesService.getAllFromUser(event.userId).pipe(
                    take(1),
                    map((snapshot: firebase.database.DataSnapshot) => {
                        const courses: Course[] = snapshot.exists() ? Object.values(snapshot.val()) : [];
                        return new FetchUserCoursesSuccess(courses);
                    }),
                    catchError(e => of(new FetchUserCoursesFail(e)))
            );
            },
            save: (_, event) => {
                return coursesService.save(event.course).pipe(
                    map(() => new SaveCourseSuccess(event.course)),
                    catchError(e => of(new SaveCourseFail(e)))
                );
            },
            find: (_, event) => {
                return coursesService.find(event.courseId).pipe(
                    map((snapshot: firebase.database.DataSnapshot) => new FindCourseSuccess(snapshot.val())),
                    catchError(e => of(new FindCourseFail(e)))
                );
            }
        },
        actions: {
            updateList: assign<CoursesContext, FetchCoursesSuccess>((_, event) => ({
                items: event.courses
            })),
            addCourse: assign<CoursesContext, SaveCourseSuccess>((ctx, event) => ({
                items: [...ctx.items, event.course]
            })),
            setActive: assign<CoursesContext, FindCourseSuccess>((_, event) => ({
                currentItem: event.course
            }))
        }
    };

    const coursesStateMachine = Machine<CoursesContext, CoursesStateSchema, CoursesMachineEvents>(coursesMachineConfig)
        .withConfig(lessonMachineOptions);

    return useMachine(coursesStateMachine);
}
