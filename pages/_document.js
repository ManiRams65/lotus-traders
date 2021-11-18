import Document, { Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document {
    render() {
        return (
            <Html>
                <Head>
                    <link rel="manifest" href="/manifest.json" />
                    <link rel="apple-touch-icon" href="/ios/192.png"></link>
                    <meta name='application-name' content='Lotus Traders' />
                    <meta name='apple-mobile-web-app-capable' content='yes' />
                    <meta name='apple-mobile-web-app-status-bar-style' content='default' />
                    <meta name='apple-mobile-web-app-title' content='Lotus Traders' />
                    <meta name='mobile-web-app-capable' content='yes' />
                    <link rel='shortcut icon' href='/favicon.ico' />
                    <meta name="theme-color" content="#3d0d3c" />
                </Head>
                <body>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        );
    }
}

export default MyDocument;