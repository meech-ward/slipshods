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

        <p className='mt-6 text-xl text-gray-300'>This is a work in progress. Just try making a code snippet and share it with someone. If you have any questions, please reach out to me on <a href='https://twitter.com/meech_ward' className='text-blue-500'>Twitter</a>.</p>

      </div>
    </>
  )
}