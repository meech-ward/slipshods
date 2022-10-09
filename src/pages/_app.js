import '../../styles/globals.css'
import { SessionProvider } from "next-auth/react"

import SiteNavigation from "../components/SiteNavigation"

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <SessionProvider session={session}>
      <SiteNavigation></SiteNavigation>
      <Component {...pageProps} />
    </SessionProvider>
  )
}

export default MyApp
