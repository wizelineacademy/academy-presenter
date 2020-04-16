import {useState, useEffect, useContext} from 'react';
import {ServiceContext} from "../context/service.context";
import {Topic} from "../domain/topic";
import {TopicsService} from "../services/topics.service";

export const useLoadTopics = (): [Topic[], boolean, TopicsService] => {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const {topicsService} = useContext(ServiceContext);
    const [service] = useState(topicsService);

    useEffect(() => {
        const subscription = service.items$.subscribe({next: setData});
        const subscriptionTwo = service.isLoading$.subscribe({next: setIsLoading});

        return () => {
            subscription.unsubscribe();
            subscriptionTwo.unsubscribe();
        }
    }, [service]);

    console.log('data: ', data);
    console.log('isLoading', isLoading);

    return [data, isLoading, service];
};
