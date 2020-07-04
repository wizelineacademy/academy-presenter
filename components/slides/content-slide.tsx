const RenderIf = ({condition, children}) => condition ? children : null;
import { Title, Section } from './withReveal';

export const ContentSlide = ({ title = 'DOM', variant = 1, children}) => {
    return (
        <Section data-state={`content-variant-${variant}`}>
            <RenderIf condition={title}>
                <Title className="text-left slide-title">{title}</Title>
            </RenderIf>
            <div className="flex">
                {children}
            </div>
        </Section>
    );
}
