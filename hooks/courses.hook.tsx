import {useState, useEffect, useContext} from 'react';
import Course from "../domain/course";
import {ServiceContext} from "../context/service.context";
import {CoursesService} from "../services/courses.service";

export const useLoadAllCourses = (): [Course[], boolean, CoursesService] => {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const {coursesService} = useContext(ServiceContext);
    // we need to set the service as state variable in order to make the calls
    // inside the useEffect function
    const [service] = useState(coursesService);

    useEffect(() => {
        // We subscribe to the observable and update the items according
        const subscription = service.items$.subscribe({next: setData});
        const subscriptionTwo = service.isLoading$.subscribe({next: setIsLoading});
        // We get all items the first time
        service.getAll();
        // We unsubscribe to avoid memory leaks
        return () => {
            subscription.unsubscribe()
            subscriptionTwo.unsubscribe()
        }
    }, [service]);

    // We provide all the data and the get all dispatch action
    return [data, isLoading, service];
};
