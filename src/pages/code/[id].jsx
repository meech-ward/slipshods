// import '../../../styles/other.css'

import prisma from '../../server/db/client'

import Link from 'next/link'
import Head from 'next/head'

import highlight from '../../utils/highlight'

import Post from '../../components/Post'
import CommentForm from '../../components/CommentForm'
import Comments from '../../components/Comments'

import { useEffect, useState } from 'react'
import useSWR from 'swr'

import axios from 'axios'

import { useSession, signIn, signOut } from "next-auth/react"

const makeFetcher = (dataProp) => (url) => axios.get(url).then(res => res.data[dataProp])

export default function Home(props) {

  const { data: session } = useSession()

  const [post, setPost] = useState(props.post)
  const [postedComment, setPostedComment] = useState(false)

  useEffect(() => {

  }, [session])

  useEffect(() => {
    if (!postedComment) {
      return
    }
    window.scrollTo({
      top: document.body.scrollHeight,
      behavior: 'smooth'
    })
  }, [postedComment])

  const { data: comments, error: commentsError, mutate: mutateComments } = useSWR(
    '/api/comments?postId=' + post.id,
    makeFetcher('comments'),
    {
      fallbackData: []
    }
  )

  const { data: liked, error: likedError, mutate: mutateLiked } = useSWR(
    '/api/likes?postId=' + post.id,
    makeFetcher('like'),
    {
      fallbackData: null
    }
  )

  console.log(liked)

  const handleNewComment = async () => {

  }

  const handleLike = async () => {
    if (liked) {
      await mutateLiked(async liked => {
        const res = await axios.delete(`/api/likes/${liked.id}`)
        return null
      }, { revalidate: false })
      setPost(post => ({ ...post, totalLikes: post.totalLikes - 1 }))
    } else {
      await mutateLiked(async liked => {
        const res = await axios.post(`/api/likes`, { postId: post.id })
        return res.data.like
      }, { revalidate: false })
      setPost(post => ({ ...post, totalLikes: post.totalLikes + 1 }))
    }
  }

  const handleSubmitComment = async ({ comment }) => {
    await mutateComments(async comments => {
      const newComment = await axios.post(`/api/comments`, { postId: post.id, comment })
      console.log([...comments, newComment.data.comment])
      return [...comments, newComment.data.comment]
    }, { revalidate: false })

    setPost({
      ...post,
      totalComments: post.totalComments + 1,
    })
    setPostedComment(true)
  }

  return (
    <>
      <Head>
        <title>{post.title}</title>
      </Head>
      <Post
        className='max-w-2xl mx-auto px-6 my-6'
        post={post}
        user={post.user}
        onComment={handleNewComment}
        onLike={handleLike}
        liked={!!liked}
      />
      <div className='max-w-2xl mx-auto my-6 border-t border-gray-600'>
        {session && <CommentForm className='px-6 my-6' user={session.user} onSubmit={handleSubmitComment} />}

        <Comments className='mt-6 mb-12' comments={comments} />
      </div>
    </>
  )
}

export async function getStaticPaths() {
  return {
    paths: [],
    fallback: 'blocking',
  }
}

async function findPostWithUser(id) {
  return prisma.post.findUnique({
    where: { id: +id },
    include: {
      user: { select: { name: true, image: true, id: true } },
    }
  })
}

export async function getStaticProps(context) {
  const id = context.params.id
  const post = await findPostWithUser(+id)
  if (!post) {
    return {
      notFound: true
    }
  }
  
  post.highlightedCode = highlight(post.code, post.language)

  return {
    props: {
      post: post
    },
  }
}