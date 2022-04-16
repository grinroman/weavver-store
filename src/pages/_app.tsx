import type { AppProps } from 'next/app';
import 'src/scss/index.scss';
import createCache from '@emotion/cache';

const clientSideEmotionCache = createCache({ key: 'css' });

function MyApp({ Component, pageProps }: AppProps) {
    return <Component {...pageProps} />;
}

export default MyApp;
