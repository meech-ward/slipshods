import { unstable_getServerSession } from "next-auth/next"
import { authOptions } from "./api/auth/[...nextauth]"

export default function handler(req, res) {
  const session = unstable_getServerSession(req, authOptions)
  if (!session) {
    res.status(401).json({ error: "Unauthorized" })
    return
  }
  res.status(200).json({ session })
}