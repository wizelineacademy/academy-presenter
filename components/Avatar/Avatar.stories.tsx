import React from 'react';
import {Avatar} from './Avatar';

export default {
    title: 'Elements/Avatar',
    component: Avatar,
};

export const defaultAvatar = () => (
    <Avatar />
)

defaultAvatar.story = {
    name: 'Empty',
};
