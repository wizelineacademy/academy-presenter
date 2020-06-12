import {createContext} from 'react';
import {FirebaseClient} from "../clients/firebase";
import {CoursesService} from "../services/courses.service";
import {LessonsService} from "../services/lessons.service";
import {TopicsService} from "../services/topics.service";
import {AuthService} from "../services/auth.service";
import {UserSession} from "../services/user.session";
import {ContentService} from "../services/content.service";

const firebaseClient = new FirebaseClient();
const coursesService = new CoursesService(firebaseClient);
const lessonsService = new LessonsService(firebaseClient);
const topicsService = new TopicsService(firebaseClient);
const authService = new AuthService(firebaseClient);
const userSession = new UserSession(authService); // Use the auth services instead of the firebase client
const contentService = new ContentService(firebaseClient);

const services = {
    firebaseClient,
    coursesService,
    lessonsService,
    topicsService,
    authService,
    userSession,
    contentService,
};

// TODO - This should be an empty object
export const ServiceContext = createContext(services);

export const ServicesProvider = ({children}) => {
    return (
        <ServiceContext.Provider value={services}>
            {children}
        </ServiceContext.Provider>
    );
}

