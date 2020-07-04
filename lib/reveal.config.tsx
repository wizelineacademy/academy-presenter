// TODO - Delete all the public reveal directory and references
// import Reveal from '../public/reveal/js/reveal';
import Reveal from 'reveal.js';

export const initializeReveal = () => {
    const exec = new Reveal();
    exec.initialize();
}
