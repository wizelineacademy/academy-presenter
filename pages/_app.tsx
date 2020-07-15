import 'highlight.js/styles/github.css';
import 'reveal.js/dist/reveal.css';
import 'reveal.js/dist/theme/white.css';
import '../public/main.css';

import {ServicesProvider} from "../context/service.context";

export default ({Component, pageProps}) => {
    return (
        <ServicesProvider>
            <Component {...pageProps} />
        </ServicesProvider>
    );
}
