import prisma from '../server/db/client'
import { unstable_getServerSession } from "next-auth/next"
import { authOptions } from "./api/auth/[...nextauth]"
import axios from 'axios'

import { signIn } from "next-auth/react"
import { useState } from 'react'

import highlight from '../utils/highlight'
import titleFromCode from '../utils/titleFromCode'

import PostSmall from '../components/PostSmall'
import Button from '../components/Button'
import Modal from '../components/Modal'
import ShareActions from '../components/ShareActions'

import { NextSeo } from 'next-seo';

import { useRouter } from "next/router"

export default function Home(props) {
  const { user } = props
  const [posts, setPosts] = useState(props.posts)
  const lastPost = posts[posts.length - 1]

  const router = useRouter()
  const [showShareModal, setShowShareModal] = useState(false)

  const handleShare = (post) => {
    setShowShareModal(post)
  }

  const handleLike = async (post) => {
    if (!user) {
      signIn()
      return
    }
    if (post.liked) {
      await axios.delete('/api/likes/' + post.liked.id)
      setPosts(posts.map(p => p.id === post.id ? { ...p, liked: null, totalLikes: p.totalLikes - 1 } : p))
    } else {
      const res = await axios.post('/api/likes', { postId: post.id })
      setPosts(posts.map(p => p.id === post.id ? { ...p, liked: res.data.like, totalLikes: p.totalLikes + 1 } : p))
    }
  }

  async function loadMore() {
    const res = await axios.get(`/api/posts?take=20&skip=1&lastId=${lastPost?.id}`)
    const newPosts = res.data.posts
    newPosts.forEach(post => {
      post.highlightedCode = highlight(post.code, post.language)
      post.liked = post.likes?.[0] || null
    })
    setPosts([...posts, ...newPosts])
  }

  return (
    <>
      <NextSeo
        title="slipshods"
        description="A place to share code snippets"
        canonical="https://slipshods.com/"
        openGraph={{
          url: 'https://slipshods.com/',
          title: 'slipshods',
          description: "A place to share code snippets",
          site_name: 'SlipShods',
          type: "website",
        }}
      />
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
                  onLike={() => handleLike(post)}
                  onComment={() => router.push(`/code/${post.id}`)}
                  onShare={() => handleShare(post)}
                />
              </li>
            ))}
          </ul>
          {lastPost?.id > 1 &&
            <Button onClick={loadMore}>
              Load More
            </Button>
          }
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
  let user = null
  if (session) {
    user = await prisma.user.findUnique({
      where: { email: session.user.email }
    })
  }

  const posts = await prisma.post.findManyWithCreator({ currentUser: user, take: 20 })

  posts.forEach(post => {
    post.highlightedCode = highlight(post.code, post.language)
    post.liked = post.likes?.[0] || null
  })

  return {
    props: {
      posts: posts,
      user: user
    },
  }
}