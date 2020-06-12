import Layout from "../../components/dashboard-layout";
import Link from "next/link";
import {useContext, useEffect} from "react";
import {ServiceContext} from "../../context/service.context";
import {useCourses} from "../../states/courses/courses.machine.service";
import {FetchUserCourses} from "../../states/courses/courses.machine.events";
import {useRouter} from "next/router";
import {Loader} from "../../components/loader";
import {convertToBatch} from "../../utils/array-batch";
import Course from "../../domain/course";

export default () => {
    const {userSession: user} = useContext(ServiceContext);
    const router = useRouter();
    const [coursesState, sendCourse] = useCourses();
    const {items: courses} = coursesState.context;
    const coursesBatch = convertToBatch(courses);
    const isLoading = coursesState.matches('fetchingByUser');

    console.log('coursesBatch', coursesBatch);

    useEffect(() => {
        if (user.isLoggedIn) {
            sendCourse(new FetchUserCourses(user.id));
            return;
        }
        router.push('/unauthorized');
    }, [])

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
                        <Link href="/dashboard/course">
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
                            <Link key={`{course.id}`} href={`/dashboard/course/${course.id}`}>
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
