import {BehaviorSubject, from} from "rxjs";
import Course, {CourseEntities} from "../domain/course";
import {FirebaseClient} from "../clients/firebase";
import {DataSnapshot} from "@firebase/database";
import {take} from "rxjs/operators";
import {ServiceInterface} from "../domain/service.interface";

export class CoursesService implements ServiceInterface {
    isLoading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    items$: BehaviorSubject<Course[]> = new BehaviorSubject<Course[]>([]);
    entities$: BehaviorSubject<CourseEntities> = new BehaviorSubject<CourseEntities>({});
    items: Course[] = [];

    constructor(private client: FirebaseClient) {
        this.entities$.subscribe({next: (d) => console.log(d)})
    }

    getAll(): void {
        this.isLoading$.next(true);
        from(this.client.database.ref('courses').once('value'))
            .pipe(take(1))
            .subscribe((snapshot: DataSnapshot) => {
                if (snapshot.exists()) {
                    const entities = snapshot.val() as CourseEntities;
                    const courses = Object.values(entities);
                    this.entities$.next(entities);
                    this.items = courses;
                    this.items$.next(courses);
                }
                this.isLoading$.next(false);
            });
    }

    save(course: Course): void {
        from(this.client.database.ref(`courses/${course.id}`).set(course))
            .pipe(take(1))
            .subscribe(() => {
                this.items = [...this.items, course];
                this.items$.next([...this.items]);
            })
    }

    find(id: string): void {
    };
}
