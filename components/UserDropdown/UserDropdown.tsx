import React, {useState} from 'react';
import styled from 'styled-components';
import {Avatar} from '../Avatar/Avatar';
import Link from 'next/link';
import MdArrowBack from 'react-ionicons/lib/MdArrowBack';
import MdExit from 'react-ionicons/lib/MdExit';
import MdApps from 'react-ionicons/lib/MdApps';
import MdLogIn from 'react-ionicons/lib/MdLogIn';
import MdArrowDropdown from 'react-ionicons/lib/MdArrowDropdown';

type UserDropdownProps = {
    user?: any;
}

const getContainerClasses = (isOpen) => {
    const menuClasses = ["absolute right-0 mt-2 py-2 w-48 bg-white rounded-lg shadow-xl"];

    if (!isOpen) {
        menuClasses.push('hidden');
    }

    return menuClasses.join(' ');
}

export const UserDropdown = ({ user }: UserDropdownProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const menuClasses = getContainerClasses(isOpen);
    const anchorClasses ="flex items-center block px-4 py-2 text-gray-800 hover:bg-red-500 hover:text-white";

    return (
        <div className="relative">
            <div className="flex items-center">
                <Avatar user={user}/>
                <span className="mx-3">
                    {(user && user.current) ? user.current.displayName : 'Guest'}
                </span>
                <span className="mr-3 cursor-pointer" onClick={() => setIsOpen(!isOpen)}>
                    <MdArrowDropdown />
                </span>
            </div>

            <div className={menuClasses}>
                {user && user.current && (
                    <>
                        <Link href={'/admin/dashboard'}>
                            <a className={anchorClasses}><span className="mr-3"><MdApps /></span>Dashboard</a>
                        </Link>
                        <Link href={'/logout'}>
                            <a className={anchorClasses}><span className="mr-3"><MdExit /></span>Logout</a>
                        </Link>
                    </>
                )}

                {!user || (user && !user.current) && (
                    <Link href={'/login'}>
                        <a className={anchorClasses}><span className="mr-3"><MdLogIn /></span>Log In</a>
                    </Link>
                )}
            </div>
        </div>
    );
};
