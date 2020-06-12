import {from, Observable} from "rxjs";
import Course from "../domain/course";
import {FirebaseClient} from "../clients/firebase";
import {ServiceInterface} from "../domain/service.interface";

export class CoursesService implements ServiceInterface {

    constructor(private client: FirebaseClient) {}

    // TODO - get curate content only, rename method here
    getAll(): Observable<any> {
        return from(this.client.database.ref('courses').once('value'));
    }

    getAllFromUser(userId: string): Observable<any> {
        return from(this.client.database.ref('courses')
            .orderByChild('userId')
            .equalTo(userId)
            .once('value')
        );
    }

    save(course: Course): Observable<any> {
        const courseId = this.client.database.ref().child('courses').push().key;
        return from(this.client.database.ref(`courses/${courseId}`).set({...course, id: courseId}));
    }

    find(id: string): Observable<any> {
        return from(this.client.database.ref(`courses/${id}`).once('value'));
    }
}
