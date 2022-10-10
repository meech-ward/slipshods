import Image from 'next/image'
import Link from 'next/link'
import Head from 'next/head'

import { unstable_getServerSession } from "next-auth/next"
import { authOptions } from "./api/auth/[...nextauth]"

export default function Profile({user}) {
  return (
    <>
      <Head>
        <title>{user.name}</title>
      </Head>
      <div className="pt-8 pb-10 lg:pt-12 lg:pb-14 mx-auto max-w-7xl px-2">
        <h1 className='text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl md:text-6xl'>Profile</h1>
        
      <Image width={100} height={100} src={user.image} alt={user.name} />
      <h2>{user.name}</h2>
      <p>{user.email}</p>
      </div>
    </>
  )
}

export async function getServerSideProps(context) {

  const session = await unstable_getServerSession(context.req, context.res, authOptions)

  return {
    props: {
      user: session.user,
    }
  }
}