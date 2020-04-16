import {AgendaProps, Topic} from "../../domain/agenda";
import {FunctionComponent} from "react";

const exampleName = 'Topic One';
const exampleDescription = 'Description: Max of characters should be the bottom of this box';

const AgendaTopic = ({name = exampleName, description = exampleDescription}: Topic) => (
    <div className="agenda_topic">
        <h6>{name}</h6>
        <p>{description}</p>
    </div>
);

export const Agenda: FunctionComponent<AgendaProps> = ({title = 'Agenda', topics = []}) => {
    return (
        <section data-state="agenda" className="content-slide">
            <div className="flex align-items-center">
                <div className="flex-grow-1">
                    <h4 className="text-magenta text-left">{title}</h4>
                </div>
                <div className="w-50 text-right">
                    {topics.map(topic => <AgendaTopic key={`${name}`} name={topic.name} description={topic.description}/>)}
                </div>
            </div>
        </section>
    );
}
