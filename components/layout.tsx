import React from 'react';
import { withReveal } from './slides/withReveal';

export const SlideLayout = ({children}) => {
    return (
        <>
            {children}
        </>
    );
}

export default withReveal(SlideLayout);
