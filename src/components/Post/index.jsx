import Image from "next/image"

import PostActions from "../PostActions"

import titleFromCode from "../../utils/titleFromCode"

export default function Post({ onComment, onLike, onShare, liked, post, user, className = "" }) {

  return (
    <div className={className}>
      <div className={'flex flex-col justify-between'}>
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
          <pre className="mt-5 mx-5">
            <code className={post.language ? `language-${post.language}` : ""} dangerouslySetInnerHTML={{ __html: post.highlightedCode }} ></code>
          </pre>
          :
          <pre className="mt-5 mx-5 text-base text-gray-500">
            <code>
              {post.code}
            </code>
          </pre>
        }
      </div>
      <PostActions
        className="mt-6"
        onComment={onComment}
        onLike={onLike}
        onShare={onShare}
        liked={liked}
        totalComments={post.totalComments}
        totalLikes={post.totalLikes} />
    </div>
  )
}