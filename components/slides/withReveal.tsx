/**
 * This is a HOC where we are going to inject reveal.js library
 */
import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { StripesBackground } from "./../backgrounds/stripes-background";
import {Button} from 'components/Button/Button';
import MdArrowBack from 'react-ionicons/lib/MdArrowBack';

export const Title = styled.h1`
    display: block;
    color: var(--tertiary-color-one, pink) !important;
    font-size: clamp(4rem, 100vw, 5.125rem) !important;
`;

export const Section = styled.section`
    padding: 2rem;
`

const EditorControlsDiv = styled.div`
    position: absolute;
    top: 1rem;
    left: 1rem;
`;

const EditorControls = () => {
    return (
        <EditorControlsDiv>
            <Button onClick={() => window.history.back()}><MdArrowBack /></Button>
        </EditorControlsDiv>
    );
}


export const withReveal = (Component) => (props) => {
    const slidesEl = useRef(null);

    useEffect(() => {
        if (slidesEl && navigator) {
            // We depend on the browser/navigator API
            const Reveal = require('reveal.js').default;
            const RevealHighlight = require('reveal.js/plugin/highlight/highlight.esm.js').default;
            const exec = new Reveal({
                width: '90%',
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
            <EditorControls />
        </>
    );
}
