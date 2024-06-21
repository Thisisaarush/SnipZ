import { auth } from "@clerk/nextjs/server"

export default function CreateSnipLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  auth().protect()

  return <div>{children}</div>
}
