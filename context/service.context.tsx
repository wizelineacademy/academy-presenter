import {createContext} from 'react';
import {FirebaseClient} from "../clients/firebase";
import {CoursesService} from "../services/courses.service";
import {LessonsService} from "../services/lessons.service";
import {TopicsService} from "../services/topics.service";

const firebaseClient = new FirebaseClient();
const coursesService = new CoursesService(firebaseClient);
const lessonsService = new LessonsService(firebaseClient);
const topicsService = new TopicsService(firebaseClient);

export const ServiceContext = createContext({
    firebaseClient,
    coursesService,
    lessonsService,
    topicsService,
});
