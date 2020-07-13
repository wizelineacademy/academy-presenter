import {AuthService} from "./auth.service";
import { BehaviorSubject } from "rxjs";

export class UserSession {
    private user = null;
    private current$ = new BehaviorSubject(null);
    constructor(private service: AuthService) {
        this.service.instance.onAuthStateChanged(user => {
            if (user) {
                this.user = user;
                this.current$.next(user);
            } else {
                console.log('guest user');
                this.user = null;
                this.current$.next(null);
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
