import React from 'react';
import faker from 'faker';
import {LessonList} from "./lesson.list";
import {Lesson} from "../../domain/lesson";
import {Topic} from "../../domain/topic";

export default {
    title: 'Components/Lists/LessonsList',
    component: LessonList,
};

const courseId = faker.random.uuid();

const lessons: Lesson[] = 'My lessons'.split('').map(() => {
    return {
        id: faker.random.uuid(),
        name: faker.lorem.sentence(),
        summary: faker.lorem.paragraph(),
        speaker: '',
        active: false,
        position: 0,
        updatedAt: Date.now(),
        createdAt: Date.now(),
        createdBy: 'me',
        courseId
    };
});

const topics: Topic[] = lessons.reduce((acc, lesson) => {
    return [...acc, ...('My topic'.split('').map((_, index) => {
        return {
            id: faker.random.uuid(),
            title: faker.lorem.word(),
            description: faker.lorem.paragraph(),
            summary: faker.lorem.paragraph(),
            position: index + 1,
            lessonId: lesson.id,
            courseId,
            createdAt: Date.now(),
            updatedAt: Date.now(),
            createdBy: 'me'
        }
    }))]
}, []);

export const defaultLoader = () => <LessonList courseId={courseId} lessons={lessons} topics={topics} blocks={[]} />

defaultLoader.story = {
    name: 'Default',
};
