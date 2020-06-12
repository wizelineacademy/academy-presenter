import {useContext, useEffect, useState} from "react";
import {ServiceContext} from "../context/service.context";
import {useRouter} from "next/router";

export default function () {
    const {userSession, authService} = useContext(ServiceContext);
    const router = useRouter();
    authService.logout();

    useEffect(() => {
        if (!userSession.isLoggedIn) {
            router.push('/');
        }
    }, [])

    return (
        <>Loging out...</>
    );
}
