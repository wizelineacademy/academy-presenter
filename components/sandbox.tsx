import {FunctionComponent, useState} from "react";
import {SandboxProps} from "../domain/agenda";

const demoSource = "https://codesandbox.io/embed/sparkling-dust-uexld?fontsize=14&hidenavigation=1&theme=dark&view=editor";
const iFrameStyle={width:'100%', height: '500px', border:0, borderRadius: '4px', overflow: 'hidden'};

export const Sandbox = ({ src = demoSource }) => {
    const [isVisible, setVisible] = useState(null);
    const buttonLabel = isVisible ? 'Hide' : '< >';

    if (!isVisible) {
        return (
            <div style={iFrameStyle} className="sandbox_preview">
                <svg onClick={() => setVisible(true)} width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
                    <image href="/assets/editor.svg" height="100%" width="100%"/>
                </svg>
            </div>
        )
    }

    return (
        <>
            <iframe
                src={src}
                style={iFrameStyle}
                title="Vanilla"
                allow="geolocation; microphone; camera; midi; vr; accelerometer; gyroscope; payment; ambient-light-sensor; encrypted-media; usb"
                sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"
            />
        </>
    );
};
