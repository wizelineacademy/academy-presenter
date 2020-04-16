import {BehaviorSubject, from} from "rxjs";
import {FirebaseClient} from "../clients/firebase";
import {take} from "rxjs/operators";
import {Topic, TopicEntity} from "../domain/topic";
import {ServiceInterface} from "../domain/service.interface";
import {DataSnapshot} from "@firebase/database";

export class TopicsService implements ServiceInterface {
    isLoading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    items$: BehaviorSubject<Topic[]> = new BehaviorSubject<Topic[]>([]);
    items: Topic[] = [];
    entities$: BehaviorSubject<TopicEntity> = new BehaviorSubject<TopicEntity>({});

    constructor(private client: FirebaseClient) {}

    getAll(lessonId: string) {
        this.isLoading$.next(true);

        from(this.client.database.ref('topics')
            .orderByChild('lessonId')
            .equalTo(lessonId)
            .once('value'))
            .pipe(take(1))
            .subscribe((snapshot: DataSnapshot) => {
                if (snapshot.exists()) {
                    const entities = snapshot.val() as TopicEntity;
                    const topics: Topic[] = Object.values(entities);
                    this.entities$.next({...entities});
                    this.items = topics;
                    this.items$.next(topics);
                }
                this.isLoading$.next(false);
            })

    }

    save(topic: Topic) {
        from(this.client.database.ref(`topics/${topic.id}`).set(topic))
            .pipe(take(1))
            .subscribe(() => {
                this.items = [...this.items, topic];
                this.items$.next([...this.items]);
            });
    }

    find(id: string): void {
    }
}
