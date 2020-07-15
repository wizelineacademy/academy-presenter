import React, {useState, useContext} from 'react';
import {UserDropdown} from './UserDropdown/UserDropdown';
import {ServiceContext} from "../context/service.context";

type NavbarProps = {
    isActive?: boolean;
    user?: any;
    onHamburgerClick: any;
}

export const Navbar = ({isActive, user, onHamburgerClick}: NavbarProps) => {

    return (
        <header className="flex bg-white sm:flex justify-between items-center px-4 py-3 shadow">

            <div className="flex items-center justify-between px-4 py-3 sm:p-0">
                <a href="/">
                    Wizeline Academy
                </a>
            </div>

            <div>
                <nav className="px-2 pt-2 pb-4 sm:flex sm:p-0">
                    <UserDropdown user={user} />
                </nav>
            </div>
        </header>
    );
}

export const AppNavbar = () => {
    const [isActive, setActive] = useState(false);
    const {userSession: user} = useContext(ServiceContext);
    const [currentUser, setUser] = useState(user.current);
    const toggleMenu = () => setActive(!isActive);

    user.current$.subscribe(u => {
        if (currentUser !== u) {
            setUser(u);
        }
    });

    return (
        <Navbar
            isActive={isActive}
            onHamburgerClick={toggleMenu}
            user={currentUser}
        />
    );
};
