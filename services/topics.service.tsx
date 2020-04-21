import {from, Observable} from "rxjs";
import {FirebaseClient} from "../clients/firebase";
import {Topic} from "../domain/topic";
import {ServiceInterface} from "../domain/service.interface";

export class TopicsService implements ServiceInterface {
    constructor(private client: FirebaseClient) {}

    getAll(courseId: string): Observable<any> {
        return from(this.client.database.ref('topics')
            .orderByChild('courseId')
            .equalTo(courseId)
            .once('value'));
    }

    save(topic: Topic): Observable<any> {
        const id = this.client.database.ref().child('topics').push().key;
        const topicToSave = {...topic, id};
        return from(this.client.database.ref(`topics/${id}`).set(topicToSave));
    }

    find(lessonId: string): Observable<any> {
        return from(this.client.database.ref('topics')
            .orderByChild('lessonId')
            .equalTo(lessonId)
            .once('value'));
    }
}
