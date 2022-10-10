import prisma from '../../server/db/client'

import Link from 'next/link'
import Head from 'next/head'

export default function Home({ post }) {

  return (
    <>
      <Head>
        <title>{post.title}</title>
      </Head>
      <div className="pt-8 pb-10 lg:pt-12 lg:pb-14 mx-auto max-w-7xl px-2">
        <h1 className='text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl md:text-6xl'>{post.title}</h1>
        <h1 className='text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl md:text-6xl'>{post.user.name}</h1>

        <div className='max-w-4xl mx-auto'>
          <div className='mt-8'>
            <pre className='text-lg text-gray-900'>
              {post.code}
            </pre>
          </div>
        </div>
      </div>
    </>
  )
}

export async function getStaticPaths() {
  return {
    paths: [],
    fallback: 'blocking'
  }
}

export async function getStaticProps(context) {
  const id = context.params.id
  const post = await prisma.posts.findUniqueWithUser({ where: { id: +id } })
  if (!post) {
    return {
      notFound: true
    }
  }

  return {
    props: {
      post: { ...post, createdAt: post.createdAt.toISOString() }
    },
  }
}