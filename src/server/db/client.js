import { PrismaClient } from "@prisma/client"

import posts from './posts'

import titleFromCode from "../../utils/titleFromCode"

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
const actionForSingleOrMultiple = (thing, action) => {
  if (Array.isArray(thing)) {
    thing.forEach(action)
  } else {
    action(thing)
  }
}


prisma.$use(async (params, next) => {
  
  const result = await next(params)
  
  if (params.action.startsWith("find")) {
    actionForSingleOrMultiple(result, convertDatesToString)
    if (params.model === "Post") {
      actionForSingleOrMultiple(result, post => post.title = titleFromCode(post.code))
    }
  }
  return result
})

console.log({posts, prisma: prisma.post})
// prisma.post = Object.create(prisma.post, posts)
Object.assign(prisma.post, posts)


export default prisma