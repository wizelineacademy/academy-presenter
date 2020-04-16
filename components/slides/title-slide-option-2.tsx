const myCode = `import React, { useState } from 'react';

function Example() {
    const [count, setCount] = useState(0);

    return (
        <div>
            <p>You clicked {count} times</p>
            <button onClick={() => setCount(count + 1)}>
                Click me
            </button>
        </div>
    );
}`;

export const TitleSlideOptionTwo = ({code = myCode, title = "This is an example"}) => {
    return (
        <section data-state="title-option-two">
            <h4>{title}</h4>
            <pre>
                <code data-trim
                    className="hljs"
                    data-line-numbers="10-12">
                    {code}
                </code>
            </pre>
        </section>
    );
};
