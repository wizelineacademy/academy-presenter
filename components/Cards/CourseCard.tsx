import React, {useState, useContext} from 'react';
import Link from "next/link";
import Course from '../../domain/course';
import IosClockOutline from 'react-ionicons/lib/IosClockOutline';

type CourseCardProps = {
    course: Course;
}

export const Tag = ({children}) => {
    return (
        <span className="rounded-lg text-xs bg-yellow-400 px-2 py-1">{children}</span>
    );
}

export const CourseCard = ({course}: CourseCardProps) => {
    return (
        <article className="bg-white rounded-lg border overflow-hidden hover:shadow-xl transition duration-300">
            <div className="p-6 text-left">
                <Link href={`/courses/${course.id}`}>
                    <a className="font-semibold text-lg leading-tight hover:underline">{course.name}</a>
                </Link>
                <div className="flex my-2">
                    <Tag>{course.tech}</Tag>
                </div>
                <div className="my-6 text-gray-600 h-56 overflow-hidden">
                    <div className="text-gray-600">{course.summary}</div>
                </div>
                <div className="flex items-center justify-end text-gray-600">
                    <IosClockOutline className="fill-current mr-2"/><div className="text-gray-500">{course.duration} min</div>
                </div>
            </div>
        </article>
    );
}
