"use client"

import { QueryClientProvider, QueryClient } from "@tanstack/react-query"

export default function SnipsLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  const queryClient = new QueryClient()

  return (
    <QueryClientProvider client={queryClient}>
      <div>{children}</div>
    </QueryClientProvider>
  )
}
