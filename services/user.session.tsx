import {AuthService} from "./auth.service";
import {FetchUserCourses} from "../states/courses/courses.machine.events";

export class UserSession {
    private user = null;
    constructor(private service: AuthService) {
        this.service.instance.onAuthStateChanged(user => {
            if (user) {
                this.user = user;
            } else {
                this.user = null;
            }
        })
    }

    get isLoggedIn() {
        return Boolean(this.user);
    }

    get current() {
        return this.user;
    }

    get id(): string {
        return this.user.uid;
    }
}
