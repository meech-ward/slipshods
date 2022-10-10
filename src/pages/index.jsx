import prisma from '../server/db/client'

import { useSession, signIn, signOut } from "next-auth/react"

import Link from 'next/link'
import Head from 'next/head'
import Image from 'next/image'
import { queries } from '@storybook/testing-library'

export default function Home({ posts }) {

  const { data: session } = useSession()

  return (
    <>
      <Head>
        <title>Code Examples</title>
      </Head>
      <div className="pt-8 pb-10 lg:pt-12 lg:pb-14 mx-auto max-w-7xl px-2">
        <h1 className='text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl md:text-6xl'>Code Examples</h1>

        <div className='max-w-4xl mx-auto'>
          <ul className='mt-8'>
            {posts.map(post => (
              <li key={post.id} className='mb-4'>
                <Link href={`/code/${post.id}`}>
                  <a>
                    <Image
                      src={post.user.image}
                      alt={post.user.name}
                      width={40}
                      height={40}
                      className='rounded-full'
                    />
                    <span className='ml-2 text-lg text-gray-900'>{post.title}</span>
                    <span className='ml-2 text-sm text-gray-500'>{post.user.name}</span>
                    <pre>
                      {post.code}
                    </pre>
                  </a>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  )
}


export async function getServerSideProps() {
  const posts = await prisma.posts.findManyWithUser()

  return {
    props: {
      posts: posts.map(post => ({ ...post, createdAt: post.createdAt.toISOString() }))
    },
  }
}