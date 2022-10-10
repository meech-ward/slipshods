import Image from 'next/image'
import Head from 'next/head'

import { unstable_getServerSession } from "next-auth/next"
import { authOptions } from "./api/auth/[...nextauth]"
import NewPostForm from '../components/NewPostForm'

import axios from 'axios'

import { useRouter } from 'next/router'

export default function Profile({ user }) {
  const router = useRouter()

  const handleSubmit = async ({ title, code }) => {
    const { data } = await axios.post('/api/posts', { title, code })
    console.log(data)
    router.push(`/code/${data.post.id}`)
  }
  return (
    <>
      <Head>
        <title>Add Code Example</title>
      </Head>
      <div className="pt-8 pb-10 lg:pt-12 lg:pb-14 mx-auto max-w-7xl px-2">
        <h1 className='text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl md:text-6xl'>Add Code Example</h1>


        <div className='max-w-4xl mx-auto'>
          <NewPostForm className='max-w-2xl' onSubmit={handleSubmit} />
        </div>

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