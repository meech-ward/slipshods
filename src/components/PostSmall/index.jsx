import Link from "next/link"
import Image from "next/image"

import PostActions from "../PostActions"

import titleFromCode from "../../utils/titleFromCode"

export default function PostSmall({ onLike, onComment, href, post, user, className = "" }) {

  return (
    <div className={'lex flex-col overflow-hidden rounded-lg shadow-lg ' + className}>
      <Link
        href={href}
      >
        <a
        >
          <div className="flex flex-1 flex-col justify-between p-6">

            <div className="mt-2 flex items-center">
              <div className="flex-shrink-0 text-gray-100">

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
                <p className="text-sm font-medium text-gray-100">
                  {user.name}
                </p>
                <div className="flex-1 mt-1">
                  <p className="text-xl font-semibold text-gray-100">
                    {titleFromCode(post.code)}
                  </p>

                </div>
              </div>
            </div>
            {post.highlightedCode ?
          <pre className="mt-8 mx-5 max-h-52 overflow-hidden border-b border-gray-700">
            <code className={post.language ? `language-${post.language}` : ""} dangerouslySetInnerHTML={{ __html: post.highlightedCode }} ></code>
          </pre>
          :
          <pre className="mt-8 mx-5 max-h-52 overflow-hidden border-b border-gray-700">
            <code>
              {post.code}
            </code>
          </pre>
        }
          </div>
        </a>
      </Link>
      <PostActions onComment={onComment} onLike={onLike} liked={post.liked} totalComments={post.totalComments} totalLikes={post.totalLikes} />
    </div>
  )
}