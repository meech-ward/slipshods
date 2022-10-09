import Image from 'next/image'

import { unstable_getServerSession } from "next-auth/next"
import { authOptions } from "./api/auth/[...nextauth]"

export default function Profile({user}) {
  return (
    <div>
      <h1>Add Post</h1>
    </div>
  )
}

export async function getServerSideProps(context) {

  const session = await unstable_getServerSession(context.req, context.res, authOptions)
  if (!session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    }
  }

  return {
    props: {
      user: session.user,
    }
  }
}