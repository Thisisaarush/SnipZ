import { auth } from "@clerk/nextjs/server"

export default function DashboardLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  auth().protect()

  return <div>{children}</div>
}
