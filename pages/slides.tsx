import {useEffect} from 'react';
import dynamic from "next/dynamic";
import {TitleSlideOptionOne} from '../components/slides/title-slide-option-1';
import {TitleSlideOptionTwo} from '../components/slides/title-slide-option-2';
import {ContentSlide} from "../components/slides/content-slide";
import {Agenda} from "../components/slides/agenda-slide";
import {Sandbox} from "../components/sandbox";

const Layout = dynamic(() => import('../components/layout'), {ssr: false});

const anotherDemoCode = `var joe = {
  drinkCoffee: function (paper) {
    console.log('Just read' + paper);
  },
  sundayPreNap: function (monthly) {
    console.log('About to fall asleep reading this' + monthly)
  }
}

paper.subscribe(joe.drinkCoffee);
paper.subscribe(joe.sundayPreNap, 'monthly');

paper.daily();
paper.daily();
paper.monthly();`;

const topics = [
    {name: 'Definition', description: 'What is the Document Object Model'},
    {name: 'How is build', description: 'Description about how to browser creates the DOM'},
    {name: 'What we can do with the DOM', description: 'Examples of what we can achieve by using the DOM'},
    {name: 'Exercises', description: "Let's practice with real code"},
    {name: 'Q&A', description: 'Question and answers session'},
];

export default function () {
    useEffect(() => {
        // Planning to load some configuration or slides definition
    });

    return (
        <Layout>
            <TitleSlideOptionOne title={"The DOM - Document Object Model"} author="Jorge Garcia M."/>
            <Agenda topics={topics}/>
            <TitleSlideOptionTwo code={anotherDemoCode} title="Subscriber pattern"/>
            <TitleSlideOptionTwo />
            <ContentSlide>
                <Sandbox src="https://codesandbox.io/embed/indeterminate-checkbox-state-uexld?fontsize=14&hidenavigation=1&theme=dark&view=preview"/>
            </ContentSlide>
        </Layout>
    );
}
