import {BehaviorSubject, from} from "rxjs";
import {FirebaseClient} from "../clients/firebase";
import {DataSnapshot} from "@firebase/database";
import {take} from "rxjs/operators";
import {Lesson, LessonEntities} from "../domain/lesson";
import {ServiceInterface} from "../domain/service.interface";

export class LessonsService implements ServiceInterface {
    isLoading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    items$: BehaviorSubject<Lesson[]> = new BehaviorSubject<Lesson[]>([]);
    items: Lesson[] = [];
    entities$: BehaviorSubject<LessonEntities> = new BehaviorSubject<LessonEntities>({});

    constructor(private client: FirebaseClient) {}

    getAll(courseId: string): void {
        // we need to fetch only lessons that include the correct courseId
        this.isLoading$.next(true);
        from(this.client.database.ref('lessons').once('value'))
            .pipe(take(1))
            .subscribe((snapshot: DataSnapshot) => {
                if (snapshot.exists()) {
                    const entities = snapshot.val() as LessonEntities;
                    const lessons = Object.values(entities);
                    this.entities$.next({...entities});
                    this.items = lessons;
                    this.items$.next(lessons);
                    this.isLoading$.next(false);
                }
            });
    }

    save(lesson: Lesson): void {
        from(this.client.database.ref(`lessons/${lesson.id}`).set(lesson))
            .pipe(take(1))
            .subscribe(() => {
                this.items = [...this.items, lesson];
                this.items$.next([...this.items]);
            })
    }

    find(id: string): void {
    };
}
