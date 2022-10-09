import { withAuth } from "next-auth/middleware"

export default withAuth(
  // `withAuth` augments your `Request` with the user's token.
  function middleware(req) {
    // * redirect the incoming request to a different URL
    // * rewrite the response by displaying a given URL
    // * Set response cookies
    // * Set response headers
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
  }
)

export const config = { matcher: ["/profile", "/addPost"] }