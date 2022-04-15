import type { AppProps } from 'next/app';
import 'src/scss/index.scss';
import createCache from '@emotion/cache';
import { CacheProvider } from '@emotion/react';

const clientSideEmotionCache = createCache({ key: 'css' });

function MyApp({
    Component,
    pageProps,
    emotionCache = clientSideEmotionCache,
}: any) {
    return (
        <CacheProvider value={emotionCache}>
            <Component {...pageProps} />
        </CacheProvider>
    );
}

export default MyApp;
