export class BlockContent {
    content: string;
    type: string | null;
    id: string | null;
    position: number;
    topicId: string | null;
    courseId: string;
    isSlideBlock: boolean;
    isLastSlideBlock: boolean;
    title?: string;
}
