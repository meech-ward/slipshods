import '../../styles/globals.css'
import 'highlight.js/styles/github.css'
// import 'highlight.js/styles/stackoverflow.css'

import { SessionProvider } from "next-auth/react"
import useSWR, { SWRConfig } from 'swr'
import axios from 'axios'

import SiteNavigation from "../components/SiteNavigation"

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  return (
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
  )
}

export default MyApp
