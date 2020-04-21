import {from, Observable} from "rxjs";
import {FirebaseClient} from "../clients/firebase";
import {Lesson} from "../domain/lesson";
import {ServiceInterface} from "../domain/service.interface";

export class LessonsService implements ServiceInterface {
    constructor(private client: FirebaseClient) {}

    getAll(courseId: string): Observable<any> {
        return from(this.client.database.ref('lessons')
            .orderByChild('courseId')
            .equalTo(courseId)
            .once('value'))
    }

    remove(lesson: Lesson): Observable<any> {
        return from(this.client.database.ref(`lessons/${lesson.id}`).remove());
    }

    save(lesson: Lesson): Observable<any> {
        const lessonId = this.client.database.ref().child('lessons').push().key;
        const lessonToSave = {...lesson, id: lessonId};
        return from(this.client.database.ref(`lessons/${lessonId}`).set(lessonToSave))
    }

    find(lessonId: string): Observable<any> {
        return from(this.client.database.ref(`lessons/${lessonId}`).once('value'));
    };
}
