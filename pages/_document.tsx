import Document, { Html, Head, Main, NextScript } from 'next/document'

class MyDocument extends Document {
    static async getInitialProps(ctx) {
        const initialProps = await Document.getInitialProps(ctx);
        return { ...initialProps }
    }

    render() {
        return (
            <Html>
                <Head>
                </Head>
                <body id="wz-slides">
                    <Main/>
                    <NextScript />
                    <script src="//cdnjs.cloudflare.com/ajax/libs/highlight.js/9.18.1/highlight.min.js"></script>
                    <script src="/reveal/js/reveal.js" crossOrigin="anonymous"></script>
                </body>
            </Html>
        )
    }
}

export default MyDocument
