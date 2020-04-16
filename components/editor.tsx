import {useRef, useEffect, useState} from 'react';
import {initGrapJs} from '../lib/grape.config';

const TitleSlideOptionOne = () => (
    <section>
        <div className="flex">
            <div>
                <h1>
                    Name of the Presentation
                </h1>
                <h2>
                    Speaker Name and Last Name
                </h2>
            </div>
            <div>
                Logo here
            </div>
        </div>
    </section>
);

export default function() {
    const editorEl = useRef(null);

    useEffect(() => {
        initGrapJs();
    })

    return (
        <div className="slides-editor">
            <div className="panel__top">
                <div className="panel__basic-actions"></div>
            </div>
            <div id="gjs" ref={editorEl}>
                <TitleSlideOptionOne />
            </div>
            <div id="blocks"></div>
        </div>
    );
}
