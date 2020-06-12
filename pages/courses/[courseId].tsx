import {useRouter} from 'next/router';
import Layout from "../../components/dashboard-layout";
import {useEffect} from "react";
import {Loader} from "../../components/loader";
import {ShowIf} from "../../components/show-if";
import {LessonList} from "../../components/lists/lesson.list";
import {useLessons} from "../../states/lessons/lessons.machine.service";
import {FetchLessons} from "../../states/lessons/lessons.machine.events";
import {useCourses} from "../../states/courses/courses.machine.service";
import {FindCourse} from "../../states/courses/courses.machine.events";
import {useTopics} from "../../states/topics/topics.machine.service";
import {FetchTopics} from "../../states/topics/topics.machine.events";

export default function () {
    const router = useRouter();
    const {courseId} = router.query;
    const [lessonsState, lessonSend] = useLessons();
    const lessons = lessonsState.context.items;
    const [coursesState, sendCourse] = useCourses();
    const [topicsState, sendTopic] = useTopics();
    const {currentItem: course} = coursesState.context;
    const {items: topics} = topicsState.context;
    const isLoading = lessonsState.matches('fetching');

    useEffect(() => {
        courseId && lessonSend(new FetchLessons(courseId as string));
        courseId && sendCourse(new FindCourse(courseId as string));
        courseId && sendTopic(new FetchTopics(courseId as string));
    }, [courseId]);

    return (
        <Layout>
            <button className="button" onClick={() => history.back()}>Go back</button>
            <section className="hero">
                <div className="hero-body">
                    <div className="container">
                        <h1 className="title">
                            {course ? course.name : '...'}
                        </h1>
                        <p>
                            {course ? course.summary : '...'}
                        </p>
                    </div>
                </div>
            </section>

            <Loader isLoading={isLoading} />

            <ShowIf condition={!isLoading}>
                <LessonList lessons={lessons} courseId={courseId as string} topics={topics} blocks={[]}/>
            </ShowIf>

        </Layout>
    );
}
