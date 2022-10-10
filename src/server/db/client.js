import { PrismaClient } from "@prisma/client"
import posts from './posts'

let prisma

if (process.env.NODE_ENV === "production") {
  prisma = new PrismaClient()
} else {
  if (!global.prisma) {
    global.prisma = new PrismaClient()
  }

  prisma = global.prisma
}

console.log({posts, prisma: prisma.posts})
// prisma.posts = Object.create(prisma.posts, posts)
Object.assign(prisma.posts, posts)


export default prisma