# Wizeline Presenter

This is a POC develop with Next.js, reveal.js, Firebase (realtime database) and Typescript

## Installation

1. Clone the repo
2. Install the dependencies: `yarn install`
3. Create a new firebase project
3. Create a next.config.js in the root and add the firebase projectId, apikey and appId provided by firebase

```javascript
module.exports = {
    env: {
        FB_PROJECT_ID: '<project_id',
        FB_API_KEY: '<app_key>',
        FB_APP_ID: '<app_id>'
    },
};
```

## Project structure

```shell
.
├── clients
├── components
├── containers
├── context
├── domain
├── hooks (Deprecated)
├── lib
├── pages
├── public
├── services
└── states
```

- clients: Includes any third-party library configure and ready to use in the application
- components: A list of reusable components (modals, forms, etc)
- containers: Basically is a page where integrate different components
- context: Define any required context (e.g. ServiceContext, etc)
- domain: Includes typescript domain definitions (e.g. Course, Lesson, etc)
- lib: Expose third party library initialization (Similar to clients)
- pages: Define a route with a .tsx file
- public: Includes any asset or dependency that can't be included via npm
- services: Includes different services where we can communicate with a defined API, database, etc. (e.g CourseService, LessonService, etc)
- states: Includes xstate definition. Basically configure our state machine where we can dispatch and get the data depending on the state and user interactions. Connects api services and provides a valid state of the data

## Develop

To run the application locally you have to run the following command:

```shell
yarn develop
```

The application is going to run by default in the port 3000

---
## TODO

- [ ] Authenticate users
- [ ] Associate users with courses, topics, lessons and content
- [ ] Create user roles
- [ ] Add unit tests
