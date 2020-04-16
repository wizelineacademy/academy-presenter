import * as firebase from 'firebase/app';
import 'firebase/auth';
import "firebase/database";

const projectId = process.env.FB_PROJECT_ID;
const apiKey = process.env.FB_API_KEY;
const appId = process.env.FB_APP_ID;

const firebaseConfiguration = {
    apiKey,
    appId,
    projectId,
    authDomain: `${projectId}.firebaseapp.com`,
    databaseURL: `https://${projectId}.firebaseio.com`,
};

export class FirebaseClient {
    _firebase: any = null;

    constructor() {
        // We initialize once
        const hasApps = !!firebase.apps.length;
        hasApps ? firebase.app() : firebase.initializeApp(firebaseConfiguration);
        this._firebase = firebase;
    }

    get instance() {
        return this._firebase;
    }

    get database() {
        return this._firebase.database();
    }
}
