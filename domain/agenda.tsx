// TODO - Remove this reference - see domain/topic.tsx
export class Topic {
    name: string;
    description: string;
}

export class TopicListProps {
    topics: Topic[];
}

export class AgendaProps {
    title?: string;
    topics: Topic[];
}

export class SandboxProps {
    src: string;
}
