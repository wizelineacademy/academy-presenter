import classnames from 'classnames';
import React, {useState} from "react";

export const Sandbox = ({src, divided}) => {
    const [isVisible, setVisible] = useState(null);
    const width = Boolean(divided) ? '50%': '100%';
    const iFrameStyle={width, height: '500px', border:0, borderRadius: '4px', overflow: 'hidden'};

    if (!isVisible) {
        return (
            <div style={iFrameStyle} className="sandbox_preview">
                <svg onClick={() => setVisible(true)} height="100%" width={width} xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
                    <image href="/assets/editor.svg" height="100%" width="100%"/>
                </svg>
            </div>
        )
    }

    return (
        <>
            <embed className={classnames("code__embed", {'code__embed-split': divided})} src={src}/>
        </>
    );
};

export const CodeSandbox = ({content}) => {
    return (
        <embed className="code__embed" src={content} />
    );
}
