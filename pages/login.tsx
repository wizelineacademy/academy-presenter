import {useContext, useEffect} from 'react';
import {ServiceContext} from '../context/service.context';
import {useRouter} from 'next/router';

export default function () {
    const {userSession, authService} = useContext(ServiceContext);
    const router = useRouter();

    useEffect(() => {
        console.log('use effect for login is being called');
        if (userSession.isLoggedIn) {
            router.push('/');
            return;
        }
        console.log('There is not user display the authentication form option');
        authService.auth();
    })

    return (
        <>
            Login!!!
        </>
    );
}
