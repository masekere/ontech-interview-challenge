import * as React from "react";
import { DefaultSeo } from "next-seo";
import SEO from "@/config/next_seo";
import { AppProps } from "next/app";
import { CacheProvider, EmotionCache } from "@emotion/react";
import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import Head from "next/head";
import createEmotionCache from "@/style/createEmotionCache";

const clientSideEmotionCache = createEmotionCache();
const theme = createTheme();

interface MyAppProps extends AppProps {
    emotionCache?: EmotionCache;
}

const MyApp: React.FC<MyAppProps> = ({ Component, emotionCache = clientSideEmotionCache, pageProps }) => {
    return (
        <CacheProvider value={emotionCache}>
            <DefaultSeo {...SEO} />
            <Head>
                <meta name="viewport" content="initial-scale=1, width=device-width" />
            </Head>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <Component {...pageProps} />
            </ThemeProvider>
        </CacheProvider>
    );
};

export default MyApp;
