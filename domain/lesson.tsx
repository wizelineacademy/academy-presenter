export class Lesson {
    id: string; // Probably the course name with underscores
    name: string;
    summary: string;
    speaker?: string;
    active: boolean = false;
    position?: number;
    updatedAt: number;
    createdAt: number;
    createdBy: string;

    // Belongs to
    courseId: string;
}

export interface LessonEntities {
    [id: string]: Lesson;
}
