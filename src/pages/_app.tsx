import type { AppProps } from 'next/app';
import 'src/scss/index.scss';
import createCache from '@emotion/cache';
import { CacheProvider } from '@emotion/react';
import { SnackbarProvider } from 'notistack';
import { StoreProvider } from 'src/utils/context/Store';

const clientSideEmotionCache = createCache({ key: 'css' });

function MyApp({
    Component,
    pageProps,
    emotionCache = clientSideEmotionCache,
}: any) {
    return (
        <CacheProvider value={emotionCache}>
            <SnackbarProvider
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            >
                <StoreProvider>
                    <Component {...pageProps} />
                </StoreProvider>
            </SnackbarProvider>
        </CacheProvider>
    );
}

export default MyApp;
