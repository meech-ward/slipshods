import Head from 'next/head'

import { unstable_getServerSession } from "next-auth/next"
import { authOptions } from "./api/auth/[...nextauth]"
import NewPostForm from '../components/NewPostForm'

import axios from 'axios'

import { useRouter } from 'next/router'
import { useState } from 'react'

export default function Profile({ user }) {
  const router = useRouter()

  const [loading, setLoading] = useState(false)

  const handleSubmit = async ({ language, code }) => {
    setLoading(true)
    const { data } = await axios.post('/api/posts', { language, code })
    router.push(`/code/${data.post.id}`)
  }
  return (
    <>
      <Head>
        <title>Create a Snippet</title>
      </Head>
      <div className="pt-8 pb-10 lg:pt-12 lg:pb-14 max-w-5xl mx-auto px-6 my-6">
        <h1 className='text-4xl font-bold tracking-tight text-gray-100 sm:text-5xl md:text-6xl mb-6'>Create a Snippet</h1>

        <div className='mt-6'>
          {loading ?

            <div className='flex justify-center items-center h-80'>
              <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-100"></div>
            </div>

            :
            <NewPostForm className='max-w-5xl' onSubmit={handleSubmit} />
          }
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