import {createContext} from 'react';
import {FirebaseClient} from "../clients/firebase";
import {CoursesService} from "../services/courses.service";
import {LessonsService} from "../services/lessons.service";
import {TopicsService} from "../services/topics.service";
import {AuthService} from "../services/auth.service";
import {UserSession} from "../services/user.session";
import {ContentService} from "../services/content.service";

// This is a hack: Storybook is using the same webpack configuration but
// is not providing any env variable defined on the application
const isStorybook = process.env.NODE_ENV === 'development'
                 && !Boolean(process.env.FB_PROJECT_ID)
                 && !Boolean(process.env.FB_API_KEY)
                 && !Boolean(process.env.FB_APP_ID);


const services:any = (() => {

    if (isStorybook) {
        return {};
    }

    const firebaseClient = new FirebaseClient();
    const coursesService = new CoursesService(firebaseClient);
    const lessonsService = new LessonsService(firebaseClient);
    const topicsService = new TopicsService(firebaseClient);
    const authService = new AuthService(firebaseClient);
    const userSession = new UserSession(authService); // Use the auth services instead of the firebase client
    const contentService = new ContentService(firebaseClient);

    return {
        firebaseClient,
        coursesService,
        lessonsService,
        topicsService,
        authService,
        userSession,
        contentService,
    };
})();

export const ServiceContext = createContext(services);

// @ts-ignore
export const ServicesProvider = ({children}) => {
    return (
        <ServiceContext.Provider value={services}>
            {children}
        </ServiceContext.Provider>
    );
}

