import prisma from '../server/db/client'

import { useSession, signIn, signOut } from "next-auth/react"

import Link from 'next/link'
import Head from 'next/head'
import Image from 'next/image'
import { queries } from '@storybook/testing-library'

import PostSmall from '../components/PostSmall'

export default function Home({ posts }) {

  const { data: session } = useSession()

  return (
    <>
      <Head>
        <title>Code Examples</title>
      </Head>
      <div className="pt-8 pb-10 lg:pt-12 lg:pb-14 mx-auto max-w-7xl px-2">
        <h1 className='text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl md:text-6xl'>Code Examples</h1>

        <div className='max-w-2xl mx-auto'>
          <ul className='mt-8'>
            {posts.map(post => (
              <li key={post.id}>
                <PostSmall
                className='my-10'
                href={`/code/${post.id}`}
                post={post}
                user={post.user}
                />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  )
}


export async function getServerSideProps() {
  const posts = await prisma.post.findManyWithUser()

  return {
    props: {
      posts: posts
    },
  }
}