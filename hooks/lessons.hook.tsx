import {useState, useEffect, useContext} from 'react';
import {ServiceContext} from "../context/service.context";
import {LessonsService} from "../services/lessons.service";
import {Lesson} from "../domain/lesson";

export const useLoadAllLessonsFromCourse = (): [Lesson[], boolean, LessonsService] => {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const {lessonsService} = useContext(ServiceContext);
    const [service] = useState(lessonsService);

    useEffect(() => {
        const subscription = service.items$.subscribe({next: setData});
        const subscriptionTwo = service.isLoading$.subscribe({next: setIsLoading});

        return () => {
            subscription.unsubscribe()
            subscriptionTwo.unsubscribe()
        }
    }, [service]);

    return [data, isLoading, service];
};
