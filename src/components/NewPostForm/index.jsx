import { useState } from "react"

export default function NewPostForm({ onSubmit, className = "" }) {
  const [title, setTitle] = useState('')
  const [code, setCode] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit({ title, code })
  }

  return (
    <form onSubmit={handleSubmit} className={"mt-8 space-y-6 "+className} action="#" method="POST">
      <input type="hidden" name="remember" value="true" />
      <div className="rounded-md shadow-sm -space-y-px">
        <div>
          <label htmlFor="title" className="sr-only">
            Title
          </label>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            id="title"
            name="title"
            type="text"
            autoComplete="title"
            required
            className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
            placeholder="Title"
          />
          <label htmlFor="code" className="sr-only">
            Code
          </label>
          <textarea
            value={code}
            onChange={(e) => setCode(e.target.value)}
            id="code"
            name="code"
            type="text"
            autoComplete="code"
            required
            className="h-80 appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
            placeholder="Code"
          />
          <button type="submit" className="mt-4 group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            Add Code Example
          </button>
        </div>
      </div>
    </form>
  )
}