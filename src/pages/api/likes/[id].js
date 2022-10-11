import { unstable_getServerSession } from "next-auth/next"
import { authOptions } from "../auth/[...nextauth]"

import prisma from '../../../server/db/client'


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

  let { id: likeId } = req.query
  likeId = +likeId
  if (!likeId) {  
    res.status(400).json({ error: "Bad Request" })
    return
  }

  try {
    const like = await prisma.like.findUnique({
      where: {
        id: likeId
      }
    })
    // Delete the like
    // Update denormalized data
    const [updatedUser, post, deleted] = await prisma.$transaction([
      prisma.user.update({
        where: { id: user.id },
        data: {
          totalLikes: {
            increment: -1
          }
        },
      }),
      prisma.post.update({
        where: { id: like.postId },
        data: {
          totalLikes: {
            increment: -1
          }
        },
      }),
      prisma.like.delete({
        where: {
          id: likeId
        }
      })
    ])
    res.status(201).json({ like: deleted })
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: "Internal Server Error" })
  }
}


export default async function handler(req, res) {
  switch (req.method) {
    case "DELETE": await del(req, res); return
  }

  res.status(405).json({ error: "Method not allowed" })
}