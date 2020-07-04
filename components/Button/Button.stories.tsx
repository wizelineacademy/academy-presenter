import React from 'react';
import {Button} from './Button';

export default {
    title: 'Elements/Button',
    component: Button,
};


export const defaultButton = () => (
    <div className="p-6">
        <Button className="mr-2">Create</Button>
        <Button className="mr-2" variant='primary'>Submit</Button>
        <Button variant='danger'>Delete</Button>
    </div>
);

defaultButton.story = {
    name: 'Default',
};
