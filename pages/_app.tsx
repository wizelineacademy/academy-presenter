import 'bulma/css/bulma.min.css';
import '../public/reveal/css/reveal.css';
// TODO - Review if the imports are required
// import '../public/reveal/css/theme/white.css';
// import '../public/reveal/lib/css/monokai.css';
import '../public/styles.css';
import 'highlight.js/styles/github.css';

import {ServicesProvider} from "../context/service.context";

export default ({Component, pageProps}) => {
    return (
        <ServicesProvider>
            <Component {...pageProps} />
        </ServicesProvider>
    );
}
