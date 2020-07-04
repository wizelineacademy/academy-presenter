/**
 * This is a HOC where we are going to inject reveal.js library
 */
import React from 'react';
import { useEffect, useRef } from 'react';
import { StripesBackground } from "./../backgrounds/stripes-background";
import styled from 'styled-components';

export const Title = styled.h1`
    display: block;
    color: var(--tertiary-color-one, pink) !important;
    font-size: clamp(4rem, 100vw, 5.125rem) !important;
`;

export const Section = styled.section`
    width: calc(100vw - 25%) !important;
    right: 0;
    left: 0;
    margin-right: calc((960px + -25%) / -2);
    transform: translate(-10%);
`

export const withReveal = (Component) => (props) => {
    const slidesEl = useRef(null);

    useEffect(() => {
        if (slidesEl && navigator) {
            // We depend on the browser/navigator API
            const Reveal = require('reveal.js').default;
            const RevealHighlight = require('reveal.js/plugin/highlight/highlight.esm.js').default;
            const exec = new Reveal({
                plugins: [RevealHighlight],
            });
            exec.initialize();
        }
    });

    return (
        <>
            <StripesBackground />
            <div className="reveal">
                <div className="wizeline-background"></div>
                <div className="slides" ref={slidesEl}>
                    <Component {...props} />
                </div>
            </div>
        </>
    );
}
