import {useEffect} from 'react';
import dynamic from "next/dynamic";
import {TitleSlideOptionOne} from '../../components/slides/title-slide-option-1';
import {TitleSlideOptionTwo} from '../../components/slides/title-slide-option-2';
import {ContentSlide} from "../../components/slides/content-slide";
import {Agenda} from "../../components/slides/agenda-slide";
import {Sandbox} from "../../components/sandbox";
import {useRouter} from "next/router";
import {FindTopics} from "../../states/topics/topics.machine.events";
import {ShowIf} from "../../components/show-if";
import {useTopics} from "../../states/topics/topics.machine.service";
import {Loader} from "../../components/loader";
import {Topic} from "../../domain/topic";
import {useLessons} from "../../states/lessons/lessons.machine.service";
import {FindLesson} from "../../states/lessons/lessons.machine.events";

const Layout = dynamic(() => import('../../components/layout'), {ssr: false});

const anotherDemoCode = `var joe = {
  drinkCoffee: function (paper) {
    console.log('Just read' + paper);
  },
  sundayPreNap: function (monthly) {
    console.log('About to fall asleep reading this' + monthly)
  }
}

paper.subscribe(joe.drinkCoffee);
paper.subscribe(joe.sundayPreNap, 'monthly');

paper.daily();
paper.daily();
paper.monthly();`;

export default function () {
    const router = useRouter()
    const {lessonId} = router.query;
    const [topicState, sendTopic] = useTopics();
    const [lessonsState, sendLesson] = useLessons();
    const isLoading = topicState.matches('fetching');
    const isCourseLoading = lessonsState.matches('finding');
    const topics: Topic[] = topicState.context.items;
    const {currentItem: lesson} = lessonsState.context;

    const fetchContent = () => {
        if (lessonId) {
            sendTopic(new FindTopics(lessonId as string))
            sendLesson(new FindLesson(lessonId as string));
        }
    }

    useEffect(fetchContent, [lessonId]);

    // First two elements inside the Layout (Slide) are required
    // The first one is the title of the presentation
    // The second component is the agenda
    // The rest of the elements are going to be generated based on the topics content and slide type selection
    return (
        <>
            <Loader isLoading={isLoading || isCourseLoading} />
            <ShowIf condition={!isLoading && !isCourseLoading}>
                <Layout>
                    <TitleSlideOptionOne title={lesson && lesson.name} author={lesson && lesson.speaker}/>
                    <Agenda topics={topics}/>
                    <TitleSlideOptionTwo code={anotherDemoCode} title="Subscriber pattern"/>
                    <TitleSlideOptionTwo />
                    <ContentSlide>
                        <Sandbox src="https://codesandbox.io/embed/indeterminate-checkbox-state-uexld?fontsize=14&hidenavigation=1&theme=dark&view=preview"/>
                    </ContentSlide>
                </Layout>
            </ShowIf>
        </>
    );
}
