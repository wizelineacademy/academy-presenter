import Layout from "../components/dashboard-layout";
import Course from "../domain/course";
import {CourseCard} from '../components/Cards/CourseCard';

type LandingPageProps = {
    courses: Course[];
    isLoading: boolean;
}

export const LandingPage = ({courses, isLoading}: LandingPageProps) => {
    return (
        <Layout>
            <div className="grid grids-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                <div className="logo rounded-lg">
                    <div className="flex flex-col w-100">
                        <img src="/assets/Logo.svg" />
                        <div className="mt-8 text-white text-center font-bold text-4xl">
                            What do you want to learn today?
                        </div>
                    </div>
                </div>
                {courses.map((course) => (
                    <CourseCard key={course.id} course={course} />
                ))}
            </div>

            {isLoading && (
                <progress className="progress is-info is-small" max="100">60%</progress>
            )}
        </Layout>
    );
}
