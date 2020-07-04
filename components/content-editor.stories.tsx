import React from 'react';
import ContentEditor from "./content-editor";
import {action} from "@storybook/addon-actions";
import 'highlight.js/styles/github.css';

export default {
    title: 'Components/Editors/EditorContent',
    component: ContentEditor,
};

export const defaultContentEditor = () => <ContentEditor
    lessonId={'lesson'}
    topic={'test'}
    courseId={'courseTest'}
    sendContent={action('sending')}
/>

export const withContentEditor = () => <ContentEditor
    lessonId={'lesson'}
    topic={'test'}
    courseId={'courseTest'}
    sendContent={action('sending')}
    blocks={[
        {
            content: "var test = 123;",
            courseId: "courseTest",
            id: '123',
            isLastSlideBlock: false,
            isSlideBlock: false,
            position: 0,
            topicId: 'test',
            type: "code"
        },
        {
            content: "<h3>Content</h3><p>lorem in</p>",
            courseId: "courseTest",
            id: '123',
            isLastSlideBlock: false,
            isSlideBlock: false,
            position: 0,
            topicId: 'test',
            type: "text"
        }
    ]}
/>

defaultContentEditor.story = {
    name: 'Emtpy',
};
