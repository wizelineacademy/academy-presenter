const RenderIf = ({condition, children}) => condition ? children : null;

export const ContentSlide = ({ title = 'DOM', children}) => {
    return (
        <section data-state="test2" className="content-slide flex">
            <RenderIf condition={title}>
                <h4>{title}</h4>
            </RenderIf>
            {children}
        </section>
    );
}
