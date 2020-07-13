import {LandingPage} from "../containers/landing.page";
import {useCourses} from "../states/courses/courses.machine.service";
import {useEffect, useState} from "react";
import {FetchCourses} from "../states/courses/courses.machine.events";

export default function () {
    const [coursesState, send] = useCourses();
    const [isReady, setReady] = useState(false);
    const isLoading = coursesState.matches('fetching');
    const courses = coursesState.context.items;

    useEffect(() => {
        if (!isReady) {
            send(new FetchCourses());
            setReady(true);
        }
    }, [isReady])

    return (
        <>
            <LandingPage courses={courses} isLoading={isLoading}/>
        </>
    );
}

export async function getStaticProps() {
    const { Logger } = require('../clients/logger');
    const logger = new Logger('HomePage')
    logger.info('Fetching inital data');
    return { props: {} };
}