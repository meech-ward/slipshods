import '../../styles/globals.css'
import 'highlight.js/styles/stackoverflow-dark.css'

import { SessionProvider } from "next-auth/react"
import { SWRConfig } from 'swr'
import axios from 'axios'

import SiteNavigation from "../components/SiteNavigation"
import Head from 'next/head'

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <>
      <Head>
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="icon" type="image/x-icon" href="/favicon.ico" />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
        <meta name="msapplication-TileColor" content="#da532c" />
        <meta name="theme-color" content="#ffffff" />
      </Head>
      <SessionProvider session={session}>
        <SWRConfig
          value={{
            // refreshInterval: 3000,
            fetcher: (resource, init) => axios.get(resource, init).then(res => res.data)
          }}
        >
          <SiteNavigation></SiteNavigation>
          <Component {...pageProps} />
        </SWRConfig>
      </SessionProvider>
    </>
  )
}

export default MyApp
