import Image from 'next/image'

import { unstable_getServerSession } from "next-auth/next"
import { authOptions } from "./api/auth/[...nextauth]"

export default function Profile({user}) {
  return (
    <div>
      <h1>Profile</h1>
      <Image width={100} height={100} src={user.image} alt={user.name} />
      <h2>{user.name}</h2>
      <p>{user.email}</p>
    </div>
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