import prisma from '../../server/db/client'

import Link from 'next/link'
import Head from 'next/head'

import Post from '../../components/Post'
import CommentForm from '../../components/CommentForm'

import { useState } from 'react'
import axios from 'axios'

export default function Home(props) {

  const [post, setPost] = useState(props.post)
  const [comments, setComments] = useState([])

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
        className='max-w-2xl mx-auto px-6 my-6'
        post={post}
        user={post.user}
        onComment={handleNewComment}
        onLike={handleLike}
      />
      <div className='max-w-2xl mx-auto px-6 my-6'>
        {comments.map(comment => (
          <p className='' key={comment.id}>This is a comment{comment.content}</p>
        ))}
      </div>
      <CommentForm className='max-w-2xl mx-auto px-6 my-6' user={post.user} onSubmit={handleSubmitComment} />
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