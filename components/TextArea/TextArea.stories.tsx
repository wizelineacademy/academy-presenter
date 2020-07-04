import React from 'react';
import { withKnobs, boolean} from "@storybook/addon-knobs";
import {TextArea} from './TextArea';

export default {
    title: 'Elements/TextArea',
    component: TextArea,
    decorators: [withKnobs]
};

const props = {
    label: 'Description',
    onChange: null,
    onBlur: null,
    value: null,
    errors: null,
    placeholder: 'This is a placeholder',
    name: 'test'
}

export const defaultTextArea = () => (
    <div className="p-6">
        <TextArea {...props}/>
    </div>
);

defaultTextArea.story = {
    name: 'Default',
};
