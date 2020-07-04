import React from 'react';
import {UserDropdown} from './UserDropdown';

export default {
    title: 'Components/UserDropdown',
    component: UserDropdown,
};

export const defaultMenuDropdown = () => (
    <UserDropdown />
)

defaultMenuDropdown.story = {
    name: 'Empty',
};
