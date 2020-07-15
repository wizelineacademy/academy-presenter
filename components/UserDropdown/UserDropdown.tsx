import React, {useState, useContext, useEffect} from 'react';
import {useRouter} from "next/router";
import {Avatar} from '../Avatar/Avatar';
import Link from 'next/link';
import MdExit from 'react-ionicons/lib/MdExit';
import MdApps from 'react-ionicons/lib/MdApps';
import MdLogIn from 'react-ionicons/lib/MdLogIn';
import MdArrowDropdown from 'react-ionicons/lib/MdArrowDropdown';
import {ServiceContext} from '../../context/service.context';

type UserDropdownProps = {
    user?: any;
}

const getContainerClasses = (isOpen: boolean) => {
    const menuClasses = ["absolute right-0 mt-2 py-2 w-48 bg-white rounded-lg shadow-xl"];

    if (!isOpen) {
        menuClasses.push('hidden');
    }

    return menuClasses.join(' ');
}

export const UserDropdown = ({ user }: UserDropdownProps) => {
    const {authService} = useContext(ServiceContext);
    const [isOpen, setIsOpen] = useState(false);
    const menuClasses = getContainerClasses(isOpen);
    const router = useRouter();
    const anchorClasses ="flex items-center block px-4 py-2 text-gray-800 hover:bg-red-500 hover:text-white cursor-pointer";

    useEffect(() => {
        if (!user && router.pathname.includes('admin')){
            // router.push('/'); TODO: Fix this
        }
    }, user);

    const closeDropdown = () => {
        setIsOpen(false);
    }

    const handleLogIn = () => {
        authService.auth();
        closeDropdown();
    }

    const handleLogOut = () => {
        authService.logout();
        closeDropdown();
    }

    return (
        <>
            <div className="relative">
                <div className="flex items-center">
                    <Avatar user={user} />
                    <span className="mx-3">
                        {user ? user.displayName : 'Guest'}
                    </span>
                    <span className="mr-3 cursor-pointer" onClick={() => setIsOpen(!isOpen)}>
                        <MdArrowDropdown />
                    </span>
                </div>

                <div className={menuClasses}>
                    {user && (
                        <>
                            <Link href={'/admin/dashboard'}>
                                <a className={anchorClasses} onClick={closeDropdown}><span className="mr-3"><MdApps /></span>Dashboard</a>
                            </Link>
                            <a onClick={handleLogOut} className={anchorClasses}><span className="mr-3"><MdExit /></span>Logout</a>
                        </>
                    )}

                    {!user && (
                        <a onClick={handleLogIn} className={anchorClasses}><span className="mr-3">
                            <MdLogIn />
                        </span>Log In</a>
                    )}
                </div>
            </div>
        </>
    );
};
