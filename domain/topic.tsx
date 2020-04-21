export class Topic {
    id: string;
    title: string;
    description: string;
    summary: string;
    position: number = -1;
    lessonId: string; // Belongs to lesson ?
    courseId: string; // Belongs to course ?
    parentCourseId?: string = null; // In case is a sub topic
    createdAt: number;
    updatedAt: number;
    createdBy: string;
}

export type TopicEntity = {
    [id: string]: Topic;
}

