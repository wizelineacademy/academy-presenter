import React, {useEffect, useRef} from "react";
import classnames from 'classnames';
import highlight from 'highlight.js';

export const Code = ({ content, isSlideBlock }) => {
    const codeRef = useRef();

    useEffect(() => {
        console.log('-> codeRef', codeRef);
        if (codeRef) {
            highlight.highlightBlock(codeRef.current);
        }
    }, [codeRef]);

    return (
        <div className={classnames('content', {'is-slide-block': isSlideBlock})}>
            <pre>
                <code data-trim className="hljs javascript" data-line-numbers="10-12" ref={codeRef}>
                    {content}
                </code>
            </pre>
        </div>
    )
}
