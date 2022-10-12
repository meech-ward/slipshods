import NavBar from "../NavBar"
import { useSession, signIn, signOut } from "next-auth/react"
import { useRouter } from 'next/router'
import { PlusCircleIcon } from '@heroicons/react/24/outline'

export default function SiteNavigation() {

  const router = useRouter()

  const { data: session } = useSession()
  const navigation = [
    { name: 'New', Icon: PlusCircleIcon, href: '/addPost', current: router.pathname === '/addPost' },
    // { name: 'Team', href: '#', current: false },
    // { name: 'Projects', href: '#', current: false },
    // { name: 'Calendar', href: '#', current: false },
  ]

  const handleSearch = (text) => {
    router.push(`/search?q=${text}`)
  }


  return (
    <NavBar navigation={navigation} onSignIn={signIn} onSignOut={signOut} user={session?.user} onSearch={handleSearch} />
  )
}