import {useEffect, useRef} from 'react';
import {initializeReveal} from '../lib/reveal.config';
import {StripesBackground} from "./backgrounds/stripes-background";

export default ({children}) => {
    const slidesEl = useRef(null);

    useEffect(() => {
        // @ts-ignore
        const hljs = window.hljs; // This is being injected from the plugin
        slidesEl && initializeReveal();
        if (hljs) {
            document.querySelectorAll('pre code').forEach(hljs.highlightBlock);
        }
    });

    return (
        <>
            <StripesBackground />
            <div className="reveal">
                <div className="wizeline-backgrounds"></div>
                <div className="slides" ref={slidesEl}>{children}</div>
            </div>
        </>
    );
}
