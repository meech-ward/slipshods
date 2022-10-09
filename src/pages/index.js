import { PrismaClient } from '@prisma/client'

export default function Home() {
  return (
    <h1 className="text-3xl font-bold underline">
      Hello world!
    </h1>
  )
}


export function getServerSideProps() {
  console.log("getServersideProps", process.env.DATABASE_URL)


  const prisma = new PrismaClient()
  
  async function main() {
    // Connect the client
    await prisma.$connect()
    // ... you will write your Prisma Client queries here

    const allUsers = await prisma.user.findMany()
  console.log(allUsers)
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

  return {
    props: {
      // props for your component
    },
  }
}