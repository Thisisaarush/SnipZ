"use client"

import "@/styles/globals.css"
import type { Metadata } from "next"
import { Inter as FontSans } from "next/font/google"
import { cn } from "@/lib/utils"
import { ThemeProvider } from "@/components/theme/theme-provider"
import { ClerkProvider } from "@clerk/nextjs"
import { QueryClientProvider, QueryClient } from "@tanstack/react-query"
import { NavBar } from "@/components/custom/navbar"

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans"
})
// Can't export metadata from client components
// export const metadata: Metadata = {
//   title: "SnipZ: Snip, Share, Streamline",
//   description: "SnipZ is a platform for developers to share, search, and organize code snippets"
// }

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  const queryClient = new QueryClient()

  return (
    <ClerkProvider>
      <html lang="en">
        <body className={cn("min-h-screen bg-background font-sans antialiased", fontSans.variable)}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <QueryClientProvider client={queryClient}>
              <NavBar />

              {children}
            </QueryClientProvider>
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  )
}
