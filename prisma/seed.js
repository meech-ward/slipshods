const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()


const genericCode = `
// Code at the top of your async function is sync code

function logSync() {
  console.log("sync")
}

function logInPromise() {
  Promise.resolve()
  .then(() => console.log("promise"))
}

async function logAsync() {
  console.log("async")
}

async function logAsyncWithAwait() {
  await Promise.resolve()
  console.log("async with await")
}

console.log("logSync start")
logSync()
console.log("logSync end")

console.log("logInPromise start")
logInPromise()
console.log("logInPromise end")

console.log("logAsync start")
logAsync()
console.log("logAsync end")

console.log("logAsyncWithAwait start")
logAsyncWithAwait()
console.log("logAsyncWithAwait end")


// logSync start
// sync
// logSync end
// logInPromise start
// logInPromise end
// logAsync start
// async
// logAsync end
// logAsyncWithAwait start
// logAsyncWithAwait end
// promise
// async with await
`

async function main() {
  const alice = await prisma.user.upsert({
    where: { email: 'alice@prisma.io' },
    update: {},
    create: {
      email: 'alice@prisma.io',
      name: 'Alice',
      image: 'https://images.unsplash.com/photo-1665396695736-4c1a7eb96597?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1548&q=80',
      post: {
        create: [{
          language: "javascript",
          code: `import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
prisma.user.findMany()
  .then((users) => {
    console.log(users)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
`}, {
          language: "javascript",
          code: genericCode
        }
          , {
          language: "javascript",
          code: genericCode
        }
          , {
          language: "javascript",
          code: genericCode
        }
          , {
          language: "javascript",
          code: genericCode
        }
          , {
          language: "javascript",
          code: genericCode
        }
          , {
          language: "javascript",
          code: genericCode
        }],
      },
    },
  })

  const bob = await prisma.user.upsert({
    where: { email: 'bob@prisma.io' },
    update: {},
    create: {
      email: 'bob@prisma.io',
      name: 'Bob',
      image: 'https://images.unsplash.com/photo-1598155523122-3842334d2c17?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=987&q=80',
      post: {
        create: [
          {
            language: "javascript",
            code: `import axios from 'axios'
axios.get('https://twitter.com/prisma')
  .then((response) => {
    console.log(response.data)
  })
  .catch((error) => {
    console.error(error)
  })
`,
          },
          {
            language: "javascript",
            code: `import axios from 'axios'
axios.get('https://twitter.com/nexusjs')
  .then((response) => {
    console.log(response.data)
  }
  .catch((error) => {
    console.error(error)
  }
`,
          }, {
            language: "javascript",
            code: genericCode
          }
          , {
            language: "javascript",
            code: genericCode
          }
          , {
            language: "javascript",
            code: genericCode
          }
          , {
            language: "javascript",
            code: genericCode
          }
        ],
      },
    },
  })
  console.log({ alice, bob })
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })