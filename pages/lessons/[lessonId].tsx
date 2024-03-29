import Link from "next/link";
import cx from 'classnames';
import Layout from "../../components/dashboard-layout";
import {useEffect, useState} from "react";
import {useRouter} from "next/router";
import {useLoadTopics} from "../../hooks/topics.hook";
import {Topic} from "../../domain/topic";
import {Loader} from "../../components/loader";
import {ShowIf} from "../../components/show-if";

export default function () {
    const router = useRouter();
    const [topics, isLoading, service] = useLoadTopics();
    const [selectedTopic, setSelectedTopic] = useState(null);
    const {lessonId} = router.query;

    useEffect(() => {
        if (lessonId) {
            service.getAll(lessonId as string);
        }
    }, [lessonId]);

    useEffect(() => {
        if (topics.length && !selectedTopic) {
            setSelectedTopic(topics[0]);
        }
    }, [topics]);

    const isActive = (topic: Topic) => {
        return selectedTopic && topic.id === selectedTopic.id;
    };

    const selectTopic = (topic: Topic) => {
        if (topic.id !== selectedTopic.id) {
            setSelectedTopic(topic);
        }
    };

    return (
        <Layout>
            <button className="button" onClick={() => history.back()}>Go back</button>
            <section className="hero">
                <div className="hero-body">
                    <div className="container">
                        <h1 className="title">
                            Welcome to {lessonId}
                        </h1>
                        <h2 className="subtitle">
                            Here is the list of items to see in the following course
                        </h2>
                        <Link href={`/slides/${lessonId}`}>
                            <button className="button is-logo">Start presentation</button>
                        </Link>

                        <button disabled className="button">Share presentation</button>
                    </div>
                </div>
            </section>

            <Loader isLoading={isLoading} />

            <ShowIf condition={!isLoading}>
                <div className="columns">
                    <div className="column is-one-third">
                        <aside className="menu">
                            <p className="menu-label">
                                Topics
                            </p>
                            <ul className="menu-list">
                                {topics.map((topic: Topic) => (
                                    <li key={topic.id} onClick={() => selectTopic(topic)}>
                                        <a className={cx({'is-active': isActive(topic)})}>{topic.title}</a>
                                    </li>
                                ))}
                            </ul>
                        </aside>
                    </div>
                    <div className="column">
                        <ShowIf condition={selectedTopic}>
                            <h2 className="is-size-2">{selectedTopic && selectedTopic.title}</h2>
                            <h4 className="is-size-4">Summary</h4>
                            <p>
                                {selectedTopic && selectedTopic.description}
                            </p>
                        </ShowIf>
                    </div>
                </div>
            </ShowIf>

        </Layout>
    );
}
