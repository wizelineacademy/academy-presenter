import Layout from "@components/dashboard-layout";
import Link from "next/link";
import {useContext, useEffect} from "react";
import {ServiceContext} from "../../../context/service.context";
import {useCourses} from "@states/courses/courses.machine.service";
import {FetchUserCourses} from "@states/courses/courses.machine.events";
import {Loader} from "@components/loader";
import {convertToBatch} from "../../../utils/array-batch";
import Course from "@domain/course";
import {CourseList} from '@components/lists/CourseList';
import MdAdd from 'react-ionicons/lib/MdAdd';

export default () => {
    const {userSession: user} = useContext(ServiceContext);
    const [coursesState, sendCourse] = useCourses();
    const {items: courses} = coursesState.context;
    const coursesBatch = convertToBatch(courses);
    const isLoading = coursesState.matches('fetchingByUser');

    useEffect(() => {
        if (!courses.length && user && user.isLoggedIn) {
            console.log('===> empty', user.id)
            sendCourse(new FetchUserCourses(user.id));
        }
    }, [courses, user])

    if (!isLoading) {
        return (
            <Layout withMenu={true}>
                <div className="w-100 pr-5 overflow-auto">
                    <section>
                        <div className="flex items-center">
                            <span className="text-lg">Your courses</span>
                            <Link href="/admin/dashboard/course">
                                <a className="ml-auto">
                                    <button className="flex items-center bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"><MdAdd className="fill-current text-white mr-2"/>Add Course</button>
                                </a>
                            </Link>
                        </div>
                        <div className="py-6">
                            <CourseList courses={courses} />
                        </div>
                    </section>
                </div>
            </Layout>
        );
    }

    return (
        <Layout>
            <section className="hero is-dark">
                <div className="hero-body">
                    <div className="container">
                        <h1 className="title">
                            My courses
                        </h1>
                        <h2 className="subtitle">
                            Create, edit, publish and un-publish any course.
                        </h2>
                    </div>
                    <div className="is-pulled-right">
                        <Link href="admin/dashboard/course">
                            <button className="button is-link is-light">Create a new course</button>
                        </Link>
                    </div>
                </div>
            </section>

            <Loader isLoading={isLoading} />

            <section className="section">
                {coursesBatch.map((batch, index) => (
                    <div className="columns" key={`batch-${index}`}>
                        {batch.map((course: Course) => (
                            <Link key={`{course.id}`} href={`/admin/dashboard/course/${course.id}`}>
                                <div className="column is-4" key={course.id}>
                                    <div className="card">
                                        <header className="card-header">
                                            <p className="card-header-title">
                                                {course.name}
                                            </p>
                                        </header>
                                        <div className="card-content">
                                            <div className="content">
                                                {course.summary}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                ))}
            </section>
        </Layout>
    )
}
