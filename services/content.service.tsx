import {from, Observable} from "rxjs";
import {FirebaseClient} from "../clients/firebase";
import {ServiceInterface} from "../domain/service.interface";
import {BlockContent} from "../domain/content";

export class ContentService implements ServiceInterface {

    constructor(private client: FirebaseClient) {}

    getAll(courseId: string): Observable<any> {
        return from(this.client.database.ref('content')
            .orderByChild('courseId')
            .equalTo(courseId)
            .once('value')
        );
    }

    save(content: BlockContent): Observable<any> {
        const contentId = this.client.database.ref().child('content').push().key;
        const contentToInsert = {...content, id: contentId};
        console.log('[SERVICE] => content to save', contentToInsert);
        return from(this.client.database.ref(`content/${contentId}`).set(contentToInsert));
    }

    update(content: BlockContent): Observable<any> {
        return from(this.client.database.ref(`content/${content.id}`).set(content))
    }

    delete(id: string): Observable<any> {
        return from(this.client.database.ref(`content/${id}`).remove())
    }

    find(id: string): Observable<any> {
        return from(this.client.database.ref(`content/${id}`).once('value'));
    }

}
