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

  const { comment: content, postId } = req.body

  try {
    // Create the new comment
    // Update denormalized data
    const [updatedUser, post, comment] = await prisma.$transaction([
      prisma.user.update({
        where: { id: user.id },
        data: {
          totalComments: {
            increment: 1
          }
        },
      }),
      prisma.post.update({
        where: { id: postId },
        data: {
          totalComments: {
            increment: 1
          }
        },
      }),
      prisma.comments.create({
        data: {
          content: content,
          code: content,
          userId: user.id,
          postId
        }
      })
    ])
    res.status(201).json({ comment })
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: "Internal Server Error" })
  }
}

async function get(req, res) {
  const { postId } = req.query
  const comments = await prisma.comments.findManyWithUser({
    where: {
      postId: Number(postId)
    }
  })
  res.status(200).json({ comments })
}

export default async function handler(req, res) {
  switch (req.method) {
    case "POST": await post(req, res); return
    case "GET": await get(req, res); return
  }

  res.status(405).json({ error: "Method not allowed" })
}