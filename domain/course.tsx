type CourseLevel = 'Beginner' | 'Intermediate' | 'Advance';

export default class Course {
    id: string;
    name: string;
    summary: string;
    tech: string[];
    duration: number; // Estimated duration in minutes
    createdAt: number;
    updatedAt: number;
    createdBy: string;
    published?: boolean = false;
    level: CourseLevel;
}

export interface CourseEntities {
    [id: string]: Course;
}
