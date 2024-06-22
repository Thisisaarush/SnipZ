import { db } from "@/lib/db"

interface UserInfo {
  name: string
  email: string
  createdAt: string
}

export async function POST(req: Request, res: Response) {
  try {
    const { createdAt, email, name }: UserInfo = await req.json()

    const userExits = await db.user.findUnique({
      where: {
        email
      }
    })

    if (userExits) {
      return Response.json({ message: "User already exists", user: { name, email } })
    }

    await db.user.create({
      data: {
        createdAt,
        email,
        name
      }
    })

    return Response.json({
      message: "User created successfully",
      user: { name, email, createdAt }
    })
  } catch (error) {
    return Response.json({ message: "Something went wrong creating/finding user", error })
  }
}
