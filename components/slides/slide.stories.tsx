import React from 'react';
import Agenda from './agenda-slide';
import { Topic } from 'domain/topic';
import Faker from 'faker';

import 'reveal.js/dist/reveal.css';
import 'reveal.js/dist/theme/white.css';

export default {
    title: 'Components/Slide',
    component: 'Slides',
    parameters: {
        options: { showRoots: false },
    }
};

const topics: Topic[] = [
    {
        id: '1',
        title: Faker.name.title,
        description: Faker.lorem.paragraph(),
        summary: Faker.lorem.paragraph(),
        createdAt: Faker.date.past,
        updatedAt: Faker.date.past,
        position: 1,
        lessonId: '2',
        courseId: '2',
        createdBy: Faker.name.firstName
    }
];

export const title = () => (
    <Agenda title="Storybook" topics={topics} />
);
