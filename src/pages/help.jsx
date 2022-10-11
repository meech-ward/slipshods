import Link from 'next/link'
import Head from 'next/head'
import Image from 'next/image'

export default function Home({ posts }) {

  return (
    <>
      <Head>
        <title>Help!</title>
      </Head>
      <div className="pt-8 pb-10 lg:pt-12 lg:pb-14 mx-auto max-w-7xl px-2">
        <h1 className='text-4xl font-bold tracking-tight text-gray-100 sm:text-5xl md:text-6xl'>Help!</h1>

        
      </div>
    </>
  )
}