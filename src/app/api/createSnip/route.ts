import { db } from "@/lib/db"

export async function POST(req: Request, res: Response) {
  try {
    const { id, description, files, createdAt, updatedAt, email, user } = await req.json()

    if (!description || !files) {
      throw new Error("Description and files are required")
    }

    await db.snip.create({
      data: {
        id,
        description,
        createdAt,
        email,
        files,
        user,
        updatedAt
      }
    })
  } catch (error) {
    return Response.json({ error: error }, { status: 400 })
  }
}
