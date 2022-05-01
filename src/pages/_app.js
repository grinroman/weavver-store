import 'src/scss/index.scss';
import createCache from '@emotion/cache';
import { CacheProvider } from '@emotion/react';
import { SnackbarProvider } from 'notistack';
import { StoreProvider } from 'src/utils/context/Store';
import { PayPalScriptProvider } from '@paypal/react-paypal-js';

const clientSideEmotionCache = createCache({ key: 'css' });
//we check if all child component have access to paypal script
function MyApp({
    Component,
    pageProps,
    emotionCache = clientSideEmotionCache,
}) {
    return (
        <CacheProvider value={emotionCache}>
            <SnackbarProvider
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            >
                <StoreProvider>
                    <PayPalScriptProvider deferLoading={true}>
                        <Component {...pageProps} />
                    </PayPalScriptProvider>
                </StoreProvider>
            </SnackbarProvider>
        </CacheProvider>
    );
}

export default MyApp;
