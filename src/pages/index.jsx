import prisma from '../server/db/client'
import { unstable_getServerSession } from "next-auth/next"
import { authOptions } from "./api/auth/[...nextauth]"

import highlight from '../utils/highlight'

import Head from 'next/head'
import PostSmall from '../components/PostSmall'
import Button from '../components/Button'

const { useRouter } = require("next/router")

export default function Home({ posts }) {

  const router = useRouter()

  return (
    <>
      <Head>
        <title>slipshods</title>
      </Head>
      <div className="pt-8 pb-10 lg:pt-12 lg:pb-14 mx-auto max-w-7xl px-2">

        <div className='max-w-2xl mx-auto'>
          <Button onClick={() => router.push("/addPost")}>
            Create A Snippet
          </Button>
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

async function findManyWithUser({ user }) {
  return prisma.post.findMany({
    orderBy: {
      id: 'desc'
    },
    include: {
      user: {
        select: {
          name: true,
          image: true,
        }
      },
      likes: user ? {
        select: {
          id: true,
        },
        where: {
          userId: user.id
        }
      } : false
    }
  })
}


export async function getServerSideProps(context) {
  const session = await unstable_getServerSession(context.req, context.res, authOptions)
  let user
  if (session) {
    user = await prisma.user.findUnique({
      where: { email: session.user.email }
    })
  }

  const posts = await findManyWithUser({ user })

  posts.forEach(post => {
    post.highlightedCode = highlight(post.code, post.language)
    post.liked = post.likes?.length > 0
  })

  return {
    props: {
      posts: posts
    },
  }
}