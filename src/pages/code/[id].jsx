import prisma from '../../server/db/client'

import Link from 'next/link'
import Head from 'next/head'

import Post from '../../components/Post'
import CommentForm from '../../components/CommentForm'
import Comments from '../../components/Comments'

import { useState } from 'react'
import useSWR from 'swr'

import axios from 'axios'

import { useSession, signIn, signOut } from "next-auth/react"

const fetcher = (url) => axios.get(url).then(res => res.data.comments)

export default function Home(props) {

  const { data: session } = useSession()

  const [post, setPost] = useState(props.post)

  const { data: comments, error: commentsError, mutate: mutateComments } = useSWR(
    '/api/comments?postId=' + post.id,
    fetcher,
    {
      fallbackData: []
    }
  )

  const handleNewComment = async () => {

  }

  const handleLike = async () => {
    const res = await axios.post(`/api/likes`, { postId: post.id })
    console.log(res)
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
      />
      {session && <CommentForm className='max-w-2xl mx-auto px-6 my-6' user={session.user} onSubmit={handleSubmitComment} />}
      
      <Comments className='max-w-2xl mx-auto px-6 my-6' comments={comments} />
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

  return {
    props: {
      post: post
    },
  }
}