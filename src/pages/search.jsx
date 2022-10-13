// import prisma from '../server/db/client'
import { unstable_getServerSession } from "next-auth/next"
import { authOptions } from "./api/auth/[...nextauth]"
import axios from 'axios'

import { signIn } from "next-auth/react"
import { useEffect, useState } from 'react'

import highlight from '../utils/highlight'
import titleFromCode from '../utils/titleFromCode'

import PostSmall from '../components/PostSmall'
import Button from '../components/Button'
import Modal from '../components/Modal'
import ShareActions from '../components/ShareActions'
import useSWR from 'swr'

import { NextSeo } from 'next-seo';

import { useRouter } from "next/router"

const postsFetcher = (url) => axios.get(url).then(res => {
  const newPosts = res.data.posts
  newPosts.forEach(post => {
    post.highlightedCode = highlight(post.code, post.language)
    post.liked = post.likes?.[0] || null
  })
  return newPosts
})

export default function Search({ user, query, session }) {
  const { data: posts, error: postsError, mutate: mutatePosts } = useSWR(
    '/api/posts?query=' + query,
    postsFetcher,
    {
      fallbackData: []
    }
  )
  const [loading, setLoading] = useState(!posts)

  // useEffect(() => {
  //   setPosts(props.posts)
  // }, [query])

  const router = useRouter()
  const [showShareModal, setShowShareModal] = useState(false)

  const handleShare = (post) => {
    setShowShareModal(post)
  }

  const handleLike = async (post) => {
    if (!session) {
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
          <h1 className='text-3xl font-bold text-gray-100'>&quot;{query}&quot;</h1>
          <Button onClick={() => router.push("/addPost")}>
            Create A Snippet
          </Button>
          {loading ?
            <div className='flex justify-center items-center h-80'>
              <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-100"></div>
            </div>
            :
            <ul className='mt-8'>
              {posts?.map(post => (
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
  const query = context.query.q
  const session = await unstable_getServerSession(context.req, context.res, authOptions)
  // let user = null
  // if (session) {
  //   user = await prisma.user.findUnique({
  //     where: { email: session.user.email }
  //   })
  // }

  // slow database, takes too long
  // const search = `( ${query.split(" ").join(" & ")} ) | ${query.replace(" ", "")}`
  // const posts = await prisma.post.findManyWithCreator({
  //   currentUser: user,
  //   take: 100,
  //   where: {
  //     code: {
  //       search,
  //     },
  //   }
  // })
  // console.log(search)

  // posts.forEach(post => {
  //   post.highlightedCode = highlight(post.code, post.language)
  //   post.liked = post.likes?.[0] || null
  // })

  // console.log({ posts, query })

  return {
    props: {
      // posts: posts,
      // user: user,
      query,
      session
    },
  }
}