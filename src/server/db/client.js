import { PrismaClient } from "@prisma/client"
import posts from './posts'

let prisma

if (process.env.NODE_ENV === "production") {
  prisma = new PrismaClient({
    log: ["error"]
  })
} else {
  if (!global.prisma) {
    global.prisma = new PrismaClient({
      log: ["query", "error", "warn"] 
    })
  }

  prisma = global.prisma
}

const convertDatesToString = (post) => {
  post?.createdAt && (post.createdAt = post.createdAt.toString())
  post?.updatedAt && (post.updatedAt = post.updatedAt.toString())
}

prisma.$use(async (params, next) => {
  
  const result = await next(params)
  
  if (params.action.startsWith("find")) {
    if (Array.isArray(result)) {
      result.forEach(convertDatesToString)
    } else {
      convertDatesToString(result)
    }
  }
  return result
})

console.log({posts, prisma: prisma.post})
// prisma.post = Object.create(prisma.post, posts)
Object.assign(prisma.post, posts)


export default prisma