export default class Course {
    id: string;
    name: string;
    tech: string[];
    duration: number; // Estimated duration in minutes
    createdAt: number;
    updatedAt: number;
    createdBy: string;
}

export interface CourseEntities {
    [id: string]: Course;
}
