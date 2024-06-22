import { db } from "@/lib/db"

interface SnipInfo {
  description: string
  snipUrls: string[]
  createdAt: string
  email: string
}

export async function POST(req: Request, res: Response) {
  try {
    const { description, snipUrls, createdAt, email }: SnipInfo = await req.json()

    const user = await db.user.findUnique({
      where: {
        email
      }
    })

    const userId = user?.id

    if (!userId) {
      throw new Error("User not found")
    }

    await db.snip.create({
      data: {
        description,
        createdAt,
        snipUrls,
        userId
      }
    })

    return Response.json({
      message: "Snip created successfully",
      description,
      createdAt
    })
  } catch (error) {
    return Response.json({ message: "An error occurred while creating snip", error })
  }
}
