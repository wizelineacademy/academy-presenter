import '../public/reveal/css/reveal.css';
import '../public/reveal/css/theme/white.css';
import '../public/reveal/lib/css/monokai.css';
import 'bulma/css/bulma.min.css';
import 'grapesjs/dist/css/grapes.min.css';
import '../public/styles.css';
import {ServicesProvider} from "../context/service.context";

export default ({Component, pageProps}) => {
    return (
        <ServicesProvider>
            <Component {...pageProps} />
        </ServicesProvider>
    );
}
