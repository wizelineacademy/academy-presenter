import Course from "../../domain/course";

export interface CoursesStateSchema {
    states: {
        initial: {},
        fetching: {},
        saving: {},
        saved: {},
        finding: {},
        found: {},
    }
}

export interface CoursesContext {
    items: Course[];
    currentItem?: Course;
}
