import { useState } from "react"
import Image from "next/image"
export default function NewPostForm({ onSubmit, user, className = "" }) {
  const [comment, setComment] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit({ comment })
  }

  return (
    <form onSubmit={handleSubmit} className={"mt-8 space-y-6 " + className} action="#" method="POST">
      <input type="hidden" name="remember" value="true" />
      <div className="rounded-md shadow-sm -space-y-px">
        <div className="flex items-start justify-items-stretch">
          <div className="flex-shrink-0 text-gray-400">
            <Image
              className="h-12 w-12 rounded-full"
              src={user.image}
              width={50}
              height={50}
              alt=""
            />
          </div>
          <div className="ml-5 flex-1">
            <label htmlFor="comment" className="sr-only">
              Comment
            </label>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              id="comment"
              name="comment"
              type="text"
              autoComplete="comment"
              required
              className="h-20 appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              placeholder="Comment"
            />
            <button type="submit" className="mt-4 group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              Add Comment
            </button>
          </div>
        </div>
      </div >
    </form >
  )
}