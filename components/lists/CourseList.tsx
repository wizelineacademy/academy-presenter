import React, {useState} from 'react';
import Link from "next/link";
import IosClockOutline from 'react-ionicons/lib/IosClockOutline';

const Marker = ({type}) => {
    const colorsMap = {
        draft: 'bg-gray-300',
        ready: 'bg-green-500',
        running: 'bg-red-500'
    };

    const getStatusClasses = (status) => {
        const baseClasses = ["rounded-full h-4 w-4 bg-gray-300"];
        const color = colorsMap[status] || colorsMap.draft;

        return [...baseClasses, color].join(' ');
    }

    return (
        <div className="pr-4 flex items-center">
            <div className={getStatusClasses(type)}/>
        </div>
    );
}

const CourseListItem = ({course, active, onClick}) => {
    const icon = active ? '-' : '+';

    return (
        <div className="relative">
            <div className="block rounded-lg py-3 px-5 flex items-center border border-t-0 border-l-0 border-r-0 bg-white">
                <Marker type="draft" />
                <p className="mr-2 text-sm">
                    {course.name}
                </p>
                <div className="w-50 text-sm truncate whitespace-no-wrap overflow-x-auto">
                    {course.summary}
                </div>
                <p className="text-gray-600 flex items-center text-sm">
                    <IosClockOutline className="h-5 w-5"/> {course.duration} min
                </p>
                <div className="ml-auto cursor-pointer hover:shadow font-bold py-1 px-3 rounded-full"
                     onClick={() => onClick(course)}
                >
                    {icon}
                </div>
            </div>
            <div className={`py-6 px-5 bg-gray-100 ${active ? 'show' : 'hidden'}`}>
                Semper risus in hendrerit gravida rutrum quisque non tellus orci, ac auctor augue mauris! Venenatis, lectus magna fringilla urna, porttitor rhoncus dolor purus non enim praesent elementum facilisis leo, vel?
            </div>
        </div>
    );
}

export const CourseList = ({courses}) => {
    const [activeCourse, setActiveCourse] = useState(null);

    const handleActiveCourse = (course) => {
        if (activeCourse && activeCourse.id === course.id) {
            setActiveCourse(null);
        }

        if (!activeCourse || (activeCourse && activeCourse.id !== course.id)) {
            setActiveCourse(course)
        }
    }

    return (
        <div>
            {courses.map((course) => {
                return (
                    <Link key={`{course.id}`} href={`/admin/dashboard/course/${course.id}`}>
                        <a>
                            <CourseListItem
                                course={course}
                                active={activeCourse && activeCourse.id === course.id}
                                onClick={(item) => handleActiveCourse(item)}
                            />
                        </a>
                    </Link>
                );
            })}
        </div>
    )
};
