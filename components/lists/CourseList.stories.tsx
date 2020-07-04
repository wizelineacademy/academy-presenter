import React from 'react';
import {CourseList} from './CourseList';

export default {
    title: 'Components/Lists/CourseList',
    component: CourseList,
};

const dummyCourse = {
    createdAt: 1587422186778,
    createdBy: "jorge@wizeline.com",
    duration: 160,
    id: "-M5Oj3nFC71TCIn6aEHB",
    level: "Beginner",
    name: "JavaScript Crash Course",
    published: false,
    summary: "Richard McClintock, a Latin scholar from Hampden-Sydney College, is credited with discovering the source behind the ubiquitous filler text. In seeing a sample of lorem ipsum, his interest was piqued by consectetur—a genuine, albeit rare, Latin word. Consulting a Latin dictionary led McClintock to a passage from De Finibus Bonorum et Malorum (“On the Extremes of Good and Evil”), a first-century B.C. text from the Roman philosopher Cicero.",
    tech: "Javascript",
    updatedAt: 1587422186778,
    userId: "3D9AYLACrsc2OEXSqXYHv4CFSS73"
};

export const defaultCourseList = () => (
    <CourseList courses={[dummyCourse, {...dummyCourse, id: 1}, {...dummyCourse, id: 2}]} />
);

defaultCourseList.story = {
    name: 'Default',
};
