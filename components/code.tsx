import React, {useEffect, useRef} from "react";
import classnames from 'classnames';
import highlight from 'highlight.js';

export const Code = ({ content }) => {
    const codeRef = useRef();

    useEffect(() => {
        console.log('-> codeRef', codeRef);
        if (codeRef) {
            highlight.highlightBlock(codeRef.current);
        }
    }, [codeRef]);

    return (
        <div>
            <pre>
                <code data-trim className="hljs javascript" data-line-numbers="10-12" ref={codeRef}>
                    {content}
                </code>
            </pre>
        </div>
    )
}
