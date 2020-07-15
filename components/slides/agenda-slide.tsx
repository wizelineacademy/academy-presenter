import React from 'react';
import styled from 'styled-components';
import {AgendaProps} from "../../domain/agenda";
import {FunctionComponent} from "react";
import {Topic} from "../../domain/topic";
import { withReveal, Title, Section } from './withReveal';

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
        <Section data-state="agenda">
            <div className="flex items-center justify-center">
                <div className="w-full">
                    <Title className="text-left">{title}</Title>
                </div>
                <div className="text-right w-full">
                    {topics.map((topic: Topic) => <AgendaTopic key={`${name}`} title={topic.title} description={topic.description}/>)}
                </div>
            </div>
        </Section>
    );
}

export default withReveal(Agenda);
