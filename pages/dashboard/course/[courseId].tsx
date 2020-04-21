import Layout from "../../../components/dashboard-layout";
import {useRouter} from "next/router";
import {useEffect, useRef} from "react";
import {ShowIf} from "../../../components/show-if";
import {Loader} from "../../../components/loader";
import {LessonList} from "../../../components/lists/lesson.list";
import {useLessons} from "../../../states/lessons/lessons.machine.service";
import {FetchLessons} from "../../../states/lessons/lessons.machine.events";
import {LessonModal} from "../../../components/modals/lesson.modal";
import {matchPastState} from "../../../states/states.utils";
import {useCourses} from "../../../states/courses/courses.machine.service";
import {FindCourse} from "../../../states/courses/courses.machine.events";
import {useTopics} from "../../../states/topics/topics.machine.service";
import {FetchTopics} from "../../../states/topics/topics.machine.events";

export default () => {
    const router = useRouter();
    const [lessonsState, send] = useLessons();
    const [coursesState, sendCourse] = useCourses();
    const [topicsState, sendTopic] = useTopics();
    const lessonModalRef = useRef(null);
    const isLoading = lessonsState.matches('fetching');
    const {items: lessons} = lessonsState.context;
    const {currentItem: course} = coursesState.context;
    const {items: topics} = topicsState.context;
    const {courseId} = router.query;

    const openLessonModal = () => {
        lessonModalRef.current.open();
    }

    useEffect(() => {
        courseId && send(new FetchLessons(courseId as string));
        courseId && sendCourse(new FindCourse(courseId as string));
        courseId && sendTopic(new FetchTopics(courseId as string));
    }, [courseId]);

    useEffect(() => {
        if (matchPastState(lessonsState, 'saving')) {
            lessonModalRef.current.close();
        }
    }, [lessonsState])

    return (
        <Layout>
            <button className="button" onClick={() => history.back()}>Go back</button>
            <section className="hero is-dark">
                <div className="hero-body">
                    <div className="container">
                        <h1 className="title">
                            {course ? course.name : '...'}
                        </h1>
                        <h2 className="subtitle">
                            {course ? course.summary : '...'}
                        </h2>
                        <span className="tag is-info">{course ? course.level : '...'}</span>
                    </div>
                </div>
            </section>

            <Loader isLoading={isLoading} />

            <ShowIf condition={!isLoading}>
                <section className="section">
                    <LessonModal courseId={courseId as string} dispatch={send} ref={lessonModalRef}/>
                </section>
            </ShowIf>

            <ShowIf condition={lessons.length > 0}>
                <LessonList
                    courseId={course ? course.id : null}
                    lessons={lessons}
                    topics={topics}
                    isAdmin
                    state={lessonsState}
                    send={send}
                    sendTopic={sendTopic}
                    preview={true}
                    onAddLesson={openLessonModal}
                />
            </ShowIf>

        </Layout>
    );
}
