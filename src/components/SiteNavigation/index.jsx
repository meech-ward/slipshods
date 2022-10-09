import NavBar from "../NavBar"
import { useSession, signIn, signOut } from "next-auth/react"

export default function SiteNavigation() {
  const { data: session } = useSession()
  const navigation = [
    // { name: 'Dashboard', href: '#', current: true },
    // { name: 'Team', href: '#', current: false },
    // { name: 'Projects', href: '#', current: false },
    // { name: 'Calendar', href: '#', current: false },
  ]

  return (
    <NavBar navigation={navigation} onSignIn={signIn} onSignOut={signOut} user={session?.user} />
  )
}