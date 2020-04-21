import Course from "../../domain/course";

export class FetchCourses {
    readonly type = 'FETCH_COURSES';
    constructor() {}
}

export class FetchCoursesSuccess {
    readonly type = 'FETCH_COURSES_SUCCESS';
    constructor(public courses: Course[]) {}
}

export class FetchCoursesFail {
    readonly type = 'FETCH_COURSES_FAIL';
    constructor(public error: string) {}
}

export class SaveCourse {
    readonly type = 'SAVE_COURSE';
    constructor(public course: Course) {}
}

export class SaveCourseSuccess {
    readonly type = 'SAVE_COURSE_SUCCESS';
    constructor(public course: Course) {}
}

export class SaveCourseFail {
    readonly type = 'SAVE_COURSE_FAIL';
    constructor(public error: any) {}
}

export class FindCourse {
    readonly type = 'FIND_COURSE';
    constructor(public courseId: string) {}
}

export class FindCourseSuccess {
    readonly type = 'FIND_COURSE_SUCCESS';
    constructor(public course: Course) {}
}

export class FindCourseFail {
    readonly type = 'FIND_COURSE_FAIL';
    constructor(public error: any) {}
}

export type CoursesMachineEvents = FetchCourses
    | FetchCoursesSuccess
    | FetchCoursesFail
    | SaveCourse
    | SaveCourseSuccess
    | SaveCourseFail
    | FindCourse
    | FindCourseSuccess
    | FindCourseFail;
