import prisma from '../server/db/client'
import { unstable_getServerSession } from "next-auth/next"
import { authOptions } from "./api/auth/[...nextauth]"

import { useState } from 'react'

import highlight from '../utils/highlight'
import titleFromCode from '../utils/titleFromCode'

import Image from 'next/future/image'
import PostSmall from '../components/PostSmall'
import Button from '../components/Button'
import Modal from '../components/Modal'
import ShareActions from '../components/ShareActions'

import { useRouter } from "next/router"

export default function Search(props) {
  const { user, posts } = props

  const router = useRouter()
  const [showShareModal, setShowShareModal] = useState(false)

  const handleShare = (post) => {
    setShowShareModal(post)
  }

  return (
    <>
      <div className="pt-8 pb-10 lg:pt-12 lg:pb-14 mx-auto max-w-7xl px-2">

        <div className='max-w-2xl mx-auto'>
          <h1 className='text-3xl font-bold text-gray-100'>{user.name}</h1>

          <Image width={100} height={100} src={user.image} alt={user.name} />
          <h2>{user.name}</h2>
          <p>{user.email}</p>

          <ul className='mt-8'>
            {posts.map(post => (
              <li key={post.id}>
                <PostSmall
                  className='my-10'
                  href={`/code/${post.id}`}
                  post={post}
                  user={user}
                  onLike={() => router.push(`/code/${post.id}`)}
                  onComment={() => router.push(`/code/${post.id}`)}
                  onShare={() => handleShare(post)}
                />
              </li>
            ))}
          </ul>
        </div>
      </div>
      <Modal open={!!showShareModal} onClose={() => setShowShareModal(false)} maxWidth="sm">
        {showShareModal && <ShareActions url={`https://slipshods.com/code/${showShareModal.id}`} title={titleFromCode(showShareModal.code)} />}
      </Modal>
    </>
  )
}

export async function getServerSideProps(context) {
  const session = await unstable_getServerSession(context.req, context.res, authOptions)
  if (!session) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    }
  }
  let user = await prisma.user.findUnique({
    where: { email: session.user.email }
  })
  let posts = await prisma.post.findMany({
    where: {
      userId: user.id,
    }
  })

  console.log(user)

  posts.forEach(post => {
    post.highlightedCode = highlight(post.code, post.language)
  })

  return {
    props: {
      posts: posts,
      user: user
    },
  }
}