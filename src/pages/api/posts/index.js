import { unstable_getServerSession } from "next-auth/next"
import { authOptions } from "../auth/[...nextauth]"

import prisma from '../../../server/db/client'

async function post(req, res) {
  const session = await unstable_getServerSession(req, res, authOptions)
  console.log(session)
  const user = await prisma.user.findUnique({
    where: {
      email: session.user.email
    }
  })
  if (!session || !user) {
    res.status(401).json({ error: "Unauthorized" })
    return
  }

  const { title, code } = req.body

  try {
    const [updatedUser, post] = await prisma.$transaction([
      prisma.user.update({
          where: {
            id: user.id
          },
          data: {
            totalPosts: {
              increment: 1
            }
          },
        }),
      prisma.post.create({
        data: {
          title,
          code,
          userId: user.id
        }
      })
    ])
    // const result = await prisma.user.update({
    //   where: {
    //     email: session.user.email
    //   },
    //   data: {
    //     posts: {
    //       create: {
    //         title, code
    //       }
    //     },
    //     totalComments: {
    //       increment: 1
    //     }
    //   },
    //   include: {
    //     posts: true
    //   }
    // })

    // const result = await prisma.post.create({
    //   data: {
    //     title,
    //     code,
    //   },
    //   include: {
    //     user: true
    //   }

    console.log({ post })

    // prisma.post.create({
    //   data: {
    //     title,
    //     code,
    res.status(201).json({ post })
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: "Internal Server Error" })
  }

}

async function get(req, res) {
  const posts = await prisma.post.findMany({
    orderBy: {
      createdAt: "desc"
    },
  })
  res.status(200).json({ posts })
}

export default async function handler(req, res) {
  switch (req.method) {
    case "GET": await get(req, res); return
    case "POST": await post(req, res); return
  }

  res.status(405).json({ error: "Method not allowed" })
}