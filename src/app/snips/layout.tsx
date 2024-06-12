"use client"

import { QueryClientProvider, QueryClient } from "@tanstack/react-query"
import SideNavBar from "@/components/custom/side-navbar"

export default function SnipsLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  const queryClient = new QueryClient()

  return (
    <QueryClientProvider client={queryClient}>
      <div className="flex justify-center">
        <SideNavBar />
        {children}
      </div>
    </QueryClientProvider>
  )
}