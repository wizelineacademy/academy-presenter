import React from 'react';
import { withKnobs, boolean} from "@storybook/addon-knobs";
import {TextField} from './TextField';

export default {
    title: 'Elements/TextField',
    component: TextField,
    decorators: [withKnobs]
};

const props = {
    label: 'Course Name *',
    onChange: null,
    onBlur: null,
    value: null,
    errors: null,
    placeholder: 'This is a placeholder',
}

export const defaultTextField = () => (
    <div className="p-6">
        <TextField {...props}/>
    </div>
);

export const textFieldWithError = () => (
    <div className="p-6">
        <TextField {...props} errors='This is an error rorre na si sihT'/>
    </div>
);

defaultTextField.story = {
    name: 'Default',
};
