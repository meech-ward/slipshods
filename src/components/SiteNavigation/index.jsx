import NavBar from "../NavBar"
import { useSession, signIn, signOut } from "next-auth/react"
import { useRouter } from 'next/router'

export default function SiteNavigation() {

  const router = useRouter()

  const { data: session } = useSession()
  const navigation = [
    { name: 'New', href: '/addPost', current: router.pathname === '/addPost' },
    // { name: 'Team', href: '#', current: false },
    // { name: 'Projects', href: '#', current: false },
    // { name: 'Calendar', href: '#', current: false },
  ]

  return (
    <NavBar navigation={navigation} onSignIn={signIn} onSignOut={signOut} user={session?.user} />
  )
}