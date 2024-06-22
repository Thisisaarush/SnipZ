import { db } from "@/lib/db"

export async function POST(req: Request, res: Response) {
  try {
    const { email } = await req.json()

    const user = await db.user.findUnique({
      where: {
        email
      }
    })

    if (!user) {
      return Response.json({ message: "User not found" })
    }

    const snips = await db.snip.findMany({
      where: {
        userId: user.id
      }
    })

    return Response.json({
      message: "User snips fetched successfully",
      snips
    })
  } catch (error) {
    return Response.json({ message: "An error occurred while fetching user snips", error })
  }
}
