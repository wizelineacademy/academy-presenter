export class Topic {
    id: string;
    name: string;
    description: string;
    position: number;
    // Belongs to
    lessonId: string;
    // Optional: required if is a subtopic
    topicId?: string;
}

export type TopicEntity = {
    [id: string]: Topic;
}

