import prisma from '../../server/db/client'

import Link from 'next/link'
import Head from 'next/head'

import Post from '../../components/Post'
import CommentForm from '../../components/CommentForm'

import { useState } from 'react'
import axios from 'axios'

export default function Home(props) {

  const [post, setPost] = useState(props.post)

  const handleNewComment = async () => {

  }
  const handleLike = async () => {
    setPost({ ...post, liked: !post.liked, likes: post.likes + 1 })
  }

  const handleSubmitComment = async ({ comment }) => {
    console.log(comment)
    const res = await axios.post(`/api/comments`, { comment, postId: post.id })
    setPost({
      ...post,
      totalComments: post.totalComments + 1,
      comments: [...post.comments, res.data.comment]
    })
  }

  return (
    <>
      <Head>
        <title>{post.title}</title>
      </Head>
      <Post
        className='max-w-2xl mx-auto'
        post={post}
        user={post.user}
        onComment={handleNewComment}
        onLike={handleLike}
        liked={post.liked}
      />
      {post.comments.map(comment => (
        <p className='max-w-2xl mx-auto' key={comment.id}>This is a comment{comment.content}</p>
      ))}
      <CommentForm className='max-w-2xl mx-auto' user={post.user} onSubmit={handleSubmitComment} />
    </>
  )
}

export async function getStaticPaths() {
  return {
    paths: [],
    fallback: 'blocking',
  }
}

export async function getStaticProps(context) {
  const id = context.params.id
  const post = await prisma.posts.findUniqueWithUserAndComments({ where: { id: +id } })
  if (!post) {
    return {
      notFound: true
    }
  }

  console.log(post)
  return {
    props: {
      post: { ...post, comments: post.comments.map(c => ({ ...c, createdAt: c.createdAt.toISOString() })), createdAt: post.createdAt.toISOString() }
    },
  }
}