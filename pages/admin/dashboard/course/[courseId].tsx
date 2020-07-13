import {useRouter} from "next/router";
import {useEffect, useRef} from "react";
import {Layout} from "@components/dashboard-layout";
import {ShowIf} from "@components/show-if";
import {Loader} from "@components/loader";
import {LessonList} from "@components/lists/lesson.list";
import {useLessons} from "@states/lessons/lessons.machine.service";
import {FetchLessons} from "@states/lessons/lessons.machine.events";
import {LessonModal} from "@components/modals/lesson.modal";
import {matchPastState} from "@states/states.utils";
import {useCourses} from "@states/courses/courses.machine.service";
import {FindCourse} from "@states/courses/courses.machine.events";
import {useTopics} from "@states/topics/topics.machine.service";
import {FetchTopics} from "@states/topics/topics.machine.events";
import {useContent} from "@states/content/content.machine.service";
import {FetchContent} from "@states/content/content.machine.events";
import {Button} from '@components/Button/Button';

export default () => {
    const router = useRouter();
    const [lessonsState, send] = useLessons();
    const [coursesState, sendCourse] = useCourses();
    const [topicsState, sendTopic] = useTopics();
    const [contentState, sendContent] = useContent();
    const lessonModalRef = useRef(null);
    const isLoading = lessonsState.matches('fetching');
    const {items: lessons} = lessonsState.context;
    const {currentItem: course} = coursesState.context;
    const {items: topics} = topicsState.context;
    const {items: blocks} = contentState.context;
    const {courseId} = router.query;

    const openLessonModal = () => {
        lessonModalRef.current.open();
    }

    useEffect(() => {
        if (courseId) {
            send(new FetchLessons(courseId as string));
            sendCourse(new FindCourse(courseId as string));
            sendTopic(new FetchTopics(courseId as string));
            sendContent(new FetchContent(courseId as string));
        }
    }, [courseId]);

    useEffect(() => {
        if (matchPastState(lessonsState, 'saving')) {
            lessonModalRef.current.close();
        }
    }, [lessonsState])

    return (
        <Layout withMenu={true}>
            <div className="bg-white rounded shadow-md px-8 pt-6 pb-8 overflow-auto w-full">
                <section>
                    <h1 className="text-2xl mb-2">
                        {course ? course.name : '...'}
                    </h1>
                    <p className="leading-snug text-sm text-gray-600">
                        {course ? course.summary : '...'}
                    </p>
                    <div className="my-3 flex items-center">
                        <span className="tag is-info">{course ? course.level : '...'}</span>
                        <Button className="ml-auto" variant="primary" onClick={() => lessonModalRef.current.open()}>Add a new lesson</Button>
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
                        blocks={blocks}
                        isAdmin
                        state={lessonsState}
                        send={send}
                        sendTopic={sendTopic}
                        preview={true}
                        onAddLesson={openLessonModal}
                        sendContent={sendContent}
                    />
                </ShowIf>
            </div>
        </Layout>
    );
}
