import React from 'react';
import {Navbar} from './navigation';
import '../public/main.css';

export default {
    title: 'Components/Navbar',
    component: Navbar,
};

export const defaultNavbar = () => (
    <div className="bg-gray-200 min-h-screen" >
        <Navbar
            user={null}
            isActive={false}
            onHamburgerClick={() => {}}
        />
    </div>
)

export const withUser = () => (
    <div className="bg-gray-200 min-h-screen" >
        <Navbar
            user={{
                current: {
                    photoURL: 'http://placekitten.com/g/16/16'
                }
            }}
            isActive={false}
            onHamburgerClick={() => {}}
        />
    </div>
)

defaultNavbar.story = {
    name: 'Logout',
};
