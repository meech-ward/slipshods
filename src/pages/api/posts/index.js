import { unstable_getServerSession } from "next-auth/next"
import { authOptions } from "../auth/[...nextauth]"

import prisma from '../../../server/db/client'

async function post(req, res) {
  const session = await unstable_getServerSession(req, res, authOptions)
  const user = await prisma.user.findUnique({  where: { email: session.user.email  }})
  
  if (!session || !user) {
    res.status(401).json({ error: "Unauthorized" })
    return
  }

  const { language, code } = req.body

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
          code,
          language,
          userId: user.id
        }
      })
    ])

    res.status(201).json({ post })
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: "Internal Server Error" })
  }

}

async function get(req, res) {
  const { lastId, skip = 0, take = 20, query } = req.query
  const session = await unstable_getServerSession(req, res, authOptions)
  let currentUser
  if (session){
    currentUser = await prisma.user.findUnique({  where: { email: session.user.email  }})
  }

  const search = query && `( ${query.split(" ").join(" & ")} ) | ${query.replace(" ", "")}`

  const params = { 
    currentUser, 
    lastId: +lastId,
    skip: +skip,
    take: +take
  }
  if (search) {
    params.where = {
      code: {
        search,
      },
    }
  }
  const posts = await prisma.post.findManyWithCreator(params)

  res.status(200).json({ posts })
}

export default async function handler(req, res) {
  switch (req.method) {
    case "GET": await get(req, res); return
    case "POST": await post(req, res); return
  }

  res.status(405).json({ error: "Method not allowed" })
}