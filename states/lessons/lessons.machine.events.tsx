import {Lesson} from "../../domain/lesson";

export class FetchLessons {
    readonly type = 'FETCH_LESSONS';
    constructor(public courseId: string) {};
}

export class SaveLesson {
    readonly type = 'SAVE_LESSON';
    constructor(public lesson: Lesson) {};
}

export class SaveLessonSuccess {
    readonly type = 'SAVE_LESSON_SUCCESS';
    constructor(public lesson: Lesson) {};
}

export class SaveLessonFail {
    readonly type = 'SAVE_LESSON_FAIL';
    constructor(public error: any) {};
}

export class DeleteLesson {
    readonly type = 'DELETE_LESSON';
    constructor(public lesson: Lesson) {};
}

export class DeleteLessonSuccess {
    readonly type = 'DELETE_LESSON_SUCCESS';
    constructor(public lesson: Lesson) {};
}

export class DeleteLessonFail {
    readonly type = 'DELETE_LESSON_FAIL';
    constructor(public error: any) {};
}

export class DeleteLessonDone {
    readonly type = 'DELETE_LESSON_DONE';
}

export class UpdateLesson {
    readonly type = 'UPDATE_LESSON';
    constructor(public lesson: Lesson) {};
}

export class FetchLessonsSuccess {
    readonly type = 'FETCH_LESSONS_SUCCESS';
    constructor(public lessons: Lesson[]) {};
}

export class FetchLessonsFail {
    readonly type = 'FETCH_LESSONS_FAIL';
    constructor(public error: any) {};
}

export class FindLesson {
    readonly type = 'FIND_LESSON';
    constructor(public lessonId: string) {}
}

export class FindLessonSuccess {
    readonly type = 'FIND_LESSON_SUCCESS';
    constructor(public lesson: Lesson) {}
}

export class FindLessonFail {
    readonly type = 'FIND_LESSON_FAIL';
    constructor(public error: any) {}
}

export type LessonsMachineEvents = FetchLessons
    | SaveLesson
    | SaveLessonSuccess
    | DeleteLesson
    | DeleteLessonSuccess
    | DeleteLessonFail
    | DeleteLessonDone
    | UpdateLesson
    | FetchLessonsSuccess
    | FetchLessonsFail
    | FindLesson
    | FindLessonSuccess
    | FindLessonFail;
