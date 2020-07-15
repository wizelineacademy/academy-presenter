import React from 'react';
import { Welcome } from '@storybook/react/demo';
import { withKnobs, boolean} from "@storybook/addon-knobs";
import {Loader} from './loader';

export default {
    title: 'Components/Loader',
    component: Loader,
    decorators: [withKnobs]
};

export const defaultLoader = () => <Loader isLoading={boolean('Is loading', false)}/>

defaultLoader.story = {
    name: 'Default',
};
