import {LandingPage} from "../containers/landing.page";
import {useLoadAllCourses} from "../hooks/courses.hook";

export default function () {
    const [courses, isLoading] = useLoadAllCourses();

    return (
        <>
            <LandingPage courses={courses} isLoading={isLoading}/>
        </>
    );
}
