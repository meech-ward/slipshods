
import { useSession, signIn } from "next-auth/react"
import { useState } from 'react'

import { NextSeo } from 'next-seo';
import PostSmall from '../components/PostSmall'
import Button from '../components/Button'
import Modal from '../components/Modal'
import ShareActions from '../components/ShareActions'

import useSWR from 'swr'
import axios from 'axios'

import { useRouter } from "next/router"

const postsFetcher = (url) => axios.get(url).then(res => res.data.posts)

export default function Home() {
  const { data: posts, error: postsError, mutate: mutatePosts } = useSWR(
    `/api/posts?take=20&skip=0`,
    postsFetcher
  )
  const lastPost = posts?.[posts.length - 1]
  const [loading, setLoading] = useState(false)

  const router = useRouter()
  const [showShareModal, setShowShareModal] = useState(false)

  const { data: session } = useSession()

  const handleShare = (post) => {
    setShowShareModal(post)
  }

  const handleLike = async (post) => {
    if (!session) {
      signIn()
      return
    }
    mutatePosts(async posts => {
      if (post.liked) {
        await axios.delete('/api/likes/' + post.liked.id)
        return posts.map(p => p.id === post.id ? { ...p, liked: null, totalLikes: p.totalLikes - 1 } : p)
      } else {
        const res = await axios.post('/api/likes', { postId: post.id })
        return posts.map(p => p.id === post.id ? { ...p, liked: res.data.like, totalLikes: p.totalLikes + 1 } : p)
      }
    })
  }

  async function loadMore() {
    setLoading(true)
    await mutatePosts(async posts => {
      const newPosts = await postsFetcher(`/api/posts?take=20&skip=1&lastId=${lastPost?.id}`)
      return [...posts, ...newPosts]
    }, { revalidate: false })
    setLoading(false)
  }

  return (
    <>
      <NextSeo
        title="slipshods"
        description="A place to share code snippets"
        canonical="https://slipshods.com/"
        openGraph={{
          url: 'https://slipshods.com/',
          title: 'slipshods',
          description: "A place to share code snippets",
          site_name: 'SlipShods',
          type: "website",
        }}
      />
      <div className="pt-8 pb-10 lg:pt-12 lg:pb-14 mx-auto max-w-7xl px-2">

        <div className='max-w-2xl mx-auto'>
          <Button onClick={() => router.push("/addPost")}>
            Create A Snippet
          </Button>

          <ul className='mt-8'>
            {posts?.map(post => (
              <li key={post.id}>
                <PostSmall
                  className='my-10'
                  href={`/code/${post.id}`}
                  post={post}
                  user={post.user}
                  onLike={() => handleLike(post)}
                  onComment={() => router.push(`/code/${post.id}`)}
                  onShare={() => handleShare(post)}
                />
              </li>
            ))}
          </ul>
          {(loading || !posts) ?
            <div className='flex justify-center items-center h-80'>
              <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-100"></div>
            </div>
            : lastPost?.id > 1 &&
            <Button onClick={loadMore}>
              Load More
            </Button>
          }
        </div>
      </div>
      <Modal open={!!showShareModal} onClose={() => setShowShareModal(false)} maxWidth="sm">
        {showShareModal && <ShareActions url={`https://slipshods.com/code/${showShareModal.id}`} title={showShareModal.title} />}
      </Modal>
    </>
  )
}

// export async function getServerSideProps(context) {
//   const session = await unstable_getServerSession(context.req, context.res, authOptions)
//   // let user = null
//   // if (session) {
//   //   user = await prisma.user.findUnique({
//   //     where: { email: session.user.email }
//   //   })
//   // }

//   // This takes too long to load, let's do it client side
//   // const posts = await prisma.post.findManyWithCreator({currentUser: user, take: 20 })

//   // posts.forEach(post => {
//   //   post.highlightedCode = highlight(post.code, post.language)
//   //   post.liked = post.likes?.[0] || null
//   // })

//   return {
//     props: {
//       // posts: posts,
//       // user: user
//       session
//     },
//   }
// }