import React from 'react';
import {CourseCard} from './CourseCard';
import Course from '../../domain/course';

export default {
    title: 'Components/Cards/CourseCard',
    component: CourseCard,
};

const course: Course = {
    id: "-M5Oj3nFC71TCIn6aEHB",
    name: "JavaScript Crash Course",
    summary: "Richard McClintock, a Latin scholar from Hampden-Sydney College, is credited with discovering the source behind the ubiquitous filler text. In seeing a sample of lorem ipsum, his interest was piqued by consectetur—a genuine, albeit rare, Latin word. Consulting a Latin dictionary led McClintock to a passage from De Finibus Bonorum et Malorum (“On the Extremes of Good and Evil”), a first-century B.C. text from the Roman philosopher Cicero.",
    tech: "Javascript",
    duration: 160,
    createdAt: 1587422186778,
    updatedAt: 1587422186778,
    createdBy: "jorge@wizeline.com",
    published: false,
    level: "Beginner",
};


export const defaultCourseCard = () => (
    <div className="container mx-auto" >
        <CourseCard course={course} />
    </div>
)


defaultCourseCard.story = {
    name: 'Default',
};
