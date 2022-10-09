import prisma from '../server/db'

import { useSession, signIn, signOut } from "next-auth/react"
import Link from 'next/link'

export default function Home() {

  const { data: session } = useSession()

  return (
    <h1 className="text-3xl font-bold underline">
      Hello world!

      {session && (
        <Link href="/profile">
          <a>Profile</a>
        </Link>
      )}
    </h1>
  )
}


export async function getServerSideProps() {
  const allUsers = await prisma.user.findMany()

  return {
    props: {
      // props for your component
    },
  }
}