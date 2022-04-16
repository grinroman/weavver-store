import Document, { Html, Head, Main, NextScript } from 'next/document';
import React from 'react';
import createEmotionServer from '@emotion/server/create-instance';
import createCache from '@emotion/cache';
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
                </Head>
                <body>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        );
    }
}

// CustomDocument.getInitialProps = async (ctx): Promise<any> => {
//     //getting render page of the context - we change way we render the page
//     const originalRenderPage = ctx.renderPage;
//     const cache = createCache({ key: 'css' });

//     const { extractCriticalToChunks } = createEmotionServer(cache);
//     ctx.renderPage = () =>
//         originalRenderPage({
//             enhanceApp: (App) => (props) =>
//                 <App emotionCache={cache} {...props} />,
//         });

//     const initialProps = await Document.getInitialProps(ctx);
//     const emotionStyles = extractCriticalToChunks(initialProps.html);
//     const emotionStyleTags = emotionStyles.styles.map((style) => (
//         <style
//             data-emotion={`${style.key} ${style.ids.join(' ')}`}
//             key={style.key}
//             // eslint-disable-next-line react/no-danger
//             dangerouslySetInnerHTML={{ __html: style.css }}
//         />
//     ));
//     return {
//         ...initialProps,
//         styles: [
//             ...React.Children.toArray(initialProps.styles),
//             ...emotionStyleTags,
//         ],
//     };
// };
