import { db } from "@/lib/db"

export async function POST(req: Request, res: Response) {
  try {
    const { id, createdAt, email, name } = await req.json()

    const userExits = await db.user.findUnique({
      where: {
        id: id
      }
    })

    if (userExits) {
      return Response.json({ message: "User already exists", user: { name, email } })
    }

    await db.user.create({
      data: {
        id,
        createdAt,
        email,
        name
      }
    })

    return Response.json({
      message: "User created successfully",
      user: { id, name, email, createdAt }
    })
  } catch (error) {
    return Response.json({ message: "Something went wrong creating/finding user", error })
  }
}
