import React, {useState} from 'react';
import {Avatar} from '../Avatar/Avatar';
import Link from 'next/link';

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

const sharedRoutes = [{
    path: '/logout',
    name: 'Log out',
}];

const adminRoutes = [{
    path: '/admin/dashboard',
    name: 'Dashboard',
}];

const guestRoutes = [{
    path: '/login',
    name: 'Log In',
}];


export const UserDropdown = ({ user }: UserDropdownProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const menuClasses = getContainerClasses(isOpen);

    return (
        <div className="relative">
            <Avatar user={user} onClick={() => setIsOpen(!isOpen)} />

            <div className={menuClasses}>
                {user && user.current && [...adminRoutes, ...sharedRoutes].map((route) => (
                    <Link href={route.path}>
                        <a className="block px-4 py-2 text-gray-800 hover:bg-red-500 hover:text-white">{route.name}</a>
                    </Link>
                ))}

                {!user && guestRoutes.map((route) => (
                    <Link href={route.path}>
                        <a className="block px-4 py-2 text-gray-800 hover:bg-red-500 hover:text-white">{route.name}</a>
                    </Link>
                ))}

                {/* {JSON.stringify(user, null, 2)} */}

                <Link href={'/login'}>
                    <a className="block px-4 py-2 text-gray-800 hover:bg-red-500 hover:text-white">Log In</a>
                </Link>
            </div>
        </div>
    );
};
