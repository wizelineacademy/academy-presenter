import {useRouter} from 'next/router';
import Layout from "../../components/dashboard-layout";
import {useEffect} from "react";
import {Loader} from "../../components/loader";
import {Button} from "../../components/Button/Button";
import {ShowIf} from "../../components/show-if";
import {LessonList} from "../../components/lists/lesson.list";
import {useLessons} from "../../states/lessons/lessons.machine.service";
import {FetchLessons} from "../../states/lessons/lessons.machine.events";
import {useCourses} from "../../states/courses/courses.machine.service";
import {FindCourse} from "../../states/courses/courses.machine.events";
import {useTopics} from "../../states/topics/topics.machine.service";
import {FetchTopics} from "../../states/topics/topics.machine.events";
import {useContent} from "@states/content/content.machine.service";
import {FetchContent} from "@states/content/content.machine.events";

export default function () {
    const router = useRouter();
    const {courseId} = router.query;
    const [lessonsState, lessonSend] = useLessons();
    const lessons = lessonsState.context.items;
    const [coursesState, sendCourse] = useCourses();
    const [contentState, sendContent] = useContent();
    const [topicsState, sendTopic] = useTopics();
    const {currentItem: course} = coursesState.context;
    const {items: topics} = topicsState.context;
    const isLoading = lessonsState.matches('fetching');
    const {items: blocks} = contentState.context;

    useEffect(() => {
        courseId && lessonSend(new FetchLessons(courseId as string));
        courseId && sendCourse(new FindCourse(courseId as string));
        courseId && sendTopic(new FetchTopics(courseId as string));
        courseId && sendContent(new FetchContent(courseId as string));
    }, [courseId]);

    return (
        <Layout>
            <Button onClick={() => history.back()}>Go back</Button>
            <section className="bg-white py-3">
                <h1 className="text-6xl py-2">
                    {course ? course.name : '...'}
                </h1>
                <p className="text-gray-600 py-2 leading-relaxed">
                    {course ? course.summary : '...'}
                </p>
            </section>

            <Loader isLoading={isLoading} />

            <ShowIf condition={!isLoading}>
                <LessonList
                    lessons={lessons}
                    courseId={courseId as string}
                    topics={topics}
                    blocks={blocks}
                    isAdmin={false}
                />
            </ShowIf>

        </Layout>
    );
}
