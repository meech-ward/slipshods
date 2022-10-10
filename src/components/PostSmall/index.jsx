import Link from "next/link"
import Image from "next/image"

import PostActions from "../PostActions"

export default function PostSmall({ onLike, onComment, href, post, user, className = "" }) {

  return (
    <div className={'lex flex-col overflow-hidden rounded-lg shadow-lg ' + className}>
      <Link
        href={href}
      >
        <a
        >
          <div className="flex flex-1 flex-col justify-between bg-white p-6">

            <div className="mt-2 flex items-center">
              <div className="flex-shrink-0 text-gray-400">

                <span className="sr-only">{post.author?.name}</span>
                <Image
                  className="h-12 w-12 rounded-full"
                  src={user.image}
                  width={50}
                  height={50}
                  alt=""
                />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-900">
                  {user.name}
                </p>
                <div className="flex-1 mt-1">
                  <p className="text-xl font-semibold text-gray-900">
                    {post.title}
                  </p>

                </div>
              </div>
            </div>
            <p className="mt-5 mx-5 text-base text-gray-500">
              {post.code}
            </p>
          </div>
        </a>
      </Link>
      <PostActions onComment={onComment} onLike={onLike} liked={post.liked} totalComments={post.totalComments} totalLikes={post.totalLikes} />
    </div>
  )
}