import {createContext} from 'react';
import {FirebaseClient} from "../clients/firebase";
import {CoursesService} from "../services/courses.service";
import {LessonsService} from "../services/lessons.service";
import {TopicsService} from "../services/topics.service";

const firebaseClient = new FirebaseClient();
const coursesService = new CoursesService(firebaseClient);
const lessonsService = new LessonsService(firebaseClient);
const topicsService = new TopicsService(firebaseClient);

const services = {
    firebaseClient,
    coursesService,
    lessonsService,
    topicsService,
}

// TODO - This should be an empty object
export const ServiceContext = createContext(services);

export const ServicesProvider = ({children}) => {
    return (
        <ServiceContext.Provider value={services}>
            {children}
        </ServiceContext.Provider>
    );
}

