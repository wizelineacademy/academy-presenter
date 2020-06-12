import {AgendaProps} from "../../domain/agenda";
import {FunctionComponent} from "react";
import {Topic} from "../../domain/topic";

const exampleName = 'Topic One';
const exampleDescription = 'Description: Max of characters should be the bottom of this box';

const AgendaTopic = ({title = exampleName, description = exampleDescription}: any) => (
    <div className="agenda_topic">
        <h6>{title}</h6>
        <p>{description}</p>
    </div>
);

export const Agenda: FunctionComponent<AgendaProps> = ({title = 'Agenda', topics = []}) => {
    return (
        <section data-state="agenda" className="content-slide">
            <div className="flex align-items-center">
                <div className="flex-grow-1">
                    <h4 className="slide-title text-left is-size-1">{title}</h4>
                </div>
                <div className="w-50 text-right">
                    {topics.map((topic: Topic) => <AgendaTopic key={`${name}`} title={topic.title} description={topic.description}/>)}
                </div>
            </div>
        </section>
    );
}
