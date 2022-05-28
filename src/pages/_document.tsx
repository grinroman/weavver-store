import Document, { Html, Head, Main, NextScript } from 'next/document';
import React from 'react';
import createEmotionServer from '@emotion/server/create-instance';
import createCache from '@emotion/cache';
import Script from 'next/script';
export default class CustomDocument extends Document {
    public render(): JSX.Element {
        return (
            <Html>
                <Head>
                    <base href="/" />
                    <link
                        rel="preconnect"
                        href="https://fonts.googleapis.com"
                    />
                    <link rel="preconnect" href="https://fonts.gstatic.com" />
                    <link
                        href="https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&family=Nunito+Sans:ital,wght@0,200;0,300;0,400;0,600;0,700;0,800;0,900;1,200;1,300;1,400;1,600;1,700&display=swap"
                        rel="stylesheet"
                    />
                    <link
                        href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta1/dist/css/bootstrap.min.css"
                        rel="stylesheet"
                        integrity="sha384-giJF6kkoqNQ00vy+HMDP7azOuL0xtbfIcaT9wjKHr8RbDVddVHyTfAAsrekwKmP1"
                        crossOrigin="anonymous"
                    />
                </Head>
                <body>
                    <Main />
                    <NextScript />
                    <Script
                        src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.9.2/dist/umd/popper.min.js"
                        integrity="sha384-IQsoLXl5PILFhosVNubq5LC7Qb9DXgDA9i+tQ8Zj3iwWAwPtgFTxbJ8NT4GN1R8p"
                        crossOrigin="anonymous"
                    />
                </body>
            </Html>
        );
    }
}

CustomDocument.getInitialProps = async (ctx): Promise<any> => {
    //getting render page of the context - we change way we render the page
    const originalRenderPage = ctx.renderPage;
    const cache = createCache({ key: 'css' });

    const { extractCriticalToChunks } = createEmotionServer(cache);
    ctx.renderPage = () =>
        originalRenderPage({
            enhanceApp: (App) => (props) =>
                <App emotionCache={cache} {...props} />,
        });

    const initialProps = await Document.getInitialProps(ctx);
    const emotionStyles = extractCriticalToChunks(initialProps.html);
    const emotionStyleTags = emotionStyles.styles.map((style) => (
        <style
            data-emotion={`${style.key} ${style.ids.join(' ')}`}
            key={style.key}
            // eslint-disable-next-line react/no-danger
            dangerouslySetInnerHTML={{ __html: style.css }}
        />
    ));
    return {
        ...initialProps,
        styles: [
            ...React.Children.toArray(initialProps.styles),
            ...emotionStyleTags,
        ],
    };
};
