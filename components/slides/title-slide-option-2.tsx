export const TitleSlideOptionTwo = ({code = 'Hello world!', title = ""}) => {
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
