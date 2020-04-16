import {useRouter} from 'next/router';
import Layout from "../../components/dashboard-layout";
import {useLoadAllLessonsFromCourse} from "../../hooks/lessons.hook";
import {useEffect, useState} from "react";
import {Table} from "../../components/table";
import {Loader} from "../../components/loader";
import Course from "../../domain/course";

export default function () {
    const router = useRouter();
    const {courseId} = router.query;
    const [lessons, isLoading, service] = useLoadAllLessonsFromCourse();
    const [course, setCourse] = useState(new Course());

    useEffect(() => {
        courseId && service.getAll(courseId as string);
    }, [courseId]);

    return (
        <Layout>
            <button className="button" onClick={() => history.back()}>Go back</button>
            <section className="hero">
                <div className="hero-body">
                    <div className="container">
                        <h1 className="title">
                            Welcome to {course.name}
                        </h1>
                        <h2 className="subtitle">
                            Navigate an select an active course
                        </h2>
                    </div>
                </div>
            </section>
            <Loader isLoading={isLoading} />
            <Table lessons={lessons} isLoading={isLoading} />

        </Layout>
    );
}
