export class Lesson {
    id: string; // Probably the course name with underscores
    name: string;
    speaker: string;
    active: boolean;
    position: number;

    // Belongs to
    courseId: string;
}

export interface LessonEntities {
    [id: string]: Lesson;
}
