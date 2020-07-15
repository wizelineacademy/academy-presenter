import {FirebaseClient} from "../clients/firebase";

export class AuthService {
    constructor(private client: FirebaseClient) {}

    get instance() {
        return this.client.auth;
    }

    auth() {
        const provider = this.client.googleProvider;
        this.client.auth.setPersistence(this.client.persistenceOption).then(() => {
            return this.client.auth.signInWithPopup(provider);
        }).catch(function(error) {
            // Handle Errors here.
            const errorCode = error.code;
            const errorMessage = error.message;
            // The email of the user's account used.
            const email = error.email;
            // The firebase.auth.AuthCredential type that was used.
            const credential = error.credential;
            console.log('error', error);
            // ...
        });
    }

    async logout() {
        try {
            await this.client.auth.signOut();
            console.log('user was logged out');
        } catch(e) {
            console.error(e);
        }
    }
}
