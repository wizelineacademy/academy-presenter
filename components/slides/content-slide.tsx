const RenderIf = ({condition, children}) => condition ? children : null;

export const ContentSlide = ({ title = 'DOM', variant = 1, children}) => {
    return (
        <section data-state={`content-variant-${variant}`} className="content-slide flex">
            <RenderIf condition={title}>
                <h4 className="has-text-left slide-title">{title}</h4>
            </RenderIf>
            {children}
        </section>
    );
}
