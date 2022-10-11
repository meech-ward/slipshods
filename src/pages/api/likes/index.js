import { unstable_getServerSession } from "next-auth/next"
import { authOptions } from "../auth/[...nextauth]"

import prisma from '../../../server/db/client'

async function post(req, res) {
  const session = await unstable_getServerSession(req, res, authOptions)
  const user = await prisma.user.findUnique({
    where: { email: session.user.email }
  })
  if (!session || !user) {
    res.status(401).json({ error: "Unauthorized" })
    return
  }

  const { postId } = req.body
  if (!postId) {  
    res.status(400).json({ error: "Bad Request" })
    return
  }

  try {

    const like = await prisma.like.findFirst({
      where: {
        postId: postId,
        userId: user.id
      }
    })

    console.log(like)
    // Create the new like
    // Update denormalized data
    const [updatedUser, post, newOrDeletedLike] = await prisma.$transaction([
      prisma.user.update({
        where: { id: user.id },
        data: {
          totalLikes: {
            increment: like ? -1 : 1
          }
        },
      }),
      prisma.post.update({
        where: { id: postId },
        data: {
          totalLikes: {
            increment: like ? -1 : 1
          }
        },
      }),
      !like ? prisma.like.create({
        data: {
          userId: user.id,
          postId
        }
      }) : 
      prisma.like.delete({
        where: {
          id: like.id
        }
      })
    ])
    res.status(201).json({ like: like ? null : newOrDeletedLike })
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: "Internal Server Error" })
  }
}

async function del(req, res) {
  console.log("delete")
  const session = await unstable_getServerSession(req, res, authOptions)
  const user = await prisma.user.findUnique({
    where: { email: session.user.email }
  })
  if (!session || !user) {
    res.status(401).json({ error: "Unauthorized" })
    return
  }

  const { likeId } = req.query
  if (!likeId) {  
    res.status(400).json({ error: "Bad Request" })
    return
  }

  try {

    const like = await prisma.like.findFirst({
      where: {
        postId: postId,
        userId: user.id
      }
    })

    console.log(like)
    // Create the new like
    // Update denormalized data
    const [updatedUser, post, newOrDeletedLike] = await prisma.$transaction([
      prisma.user.update({
        where: { id: user.id },
        data: {
          totalLikes: {
            increment: like ? -1 : 1
          }
        },
      }),
      prisma.post.update({
        where: { id: postId },
        data: {
          totalLikes: {
            increment: like ? -1 : 1
          }
        },
      }),
      !like ? prisma.like.create({
        data: {
          userId: user.id,
          postId
        }
      }) : 
      prisma.like.delete({
        where: {
          id: like.id
        }
      })
    ])
    res.status(201).json({ like: like ? null : newOrDeletedLike })
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: "Internal Server Error" })
  }
}

async function get(req, res) {
  const session = await unstable_getServerSession(req, res, authOptions)
  const user = await prisma.user.findUnique({
    where: { email: session.user.email }
  })
  if (!session || !user) {
    res.status(401).json({ error: "Unauthorized" })
    return
  }
  const { postId } = req.query
  if (!postId) {  
    res.status(400).json({ error: "Bad Request" })
    return
  }

  const like = await prisma.like.findFirst({
    where: {
      postId: +postId,
      userId: user.id
    }
  })
  console.log({userId: user.id, postId: postId, like: like})
  res.status(200).json({ like })
}

export default async function handler(req, res) {
  switch (req.method) {
    case "POST": await post(req, res); return
    case "DELETE": await del(req, res); return
    case "GET": await get(req, res); return
  }

  res.status(405).json({ error: "Method not allowed" })
}