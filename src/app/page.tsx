import Link from "next/link"

import { ClerkLoading, SignInButton, SignedOut } from "@clerk/nextjs"
import { Button } from "@/components/ui/button"
import { Line } from "@/components/ui/line"
import Image from "next/image"

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      <Line />
      <Line type="vertical" className="absolute left-10 md:left-20 lg:left-32" />

      <div className="my-32 flex flex-col items-center gap-6">
        <h1 className="text-5xl font-bold md:text-7xl lg:text-8xl">SnipZ Code</h1>
        <p className="text-balance text-center text-sm text-gray-400 md:text-lg">
          Discover, organize, and share code snippets effortlessly with SnipZ
        </p>

        <div className="mt-10 flex items-center gap-4 md:gap-8">
          <Link href="/snips">
            <Button variant={"default"} className="h-10 w-32 font-light md:h-16 md:w-52 md:text-xl">
              Explore
            </Button>
          </Link>

          <SignedOut>
            <ClerkLoading>
              <Button
                variant={"outline"}
                className="flex h-10 w-32 items-center justify-center gap-2 font-light md:h-16 md:w-52 md:text-xl"
              >
                Get Started
              </Button>
            </ClerkLoading>
            <SignInButton>
              <Button
                variant={"outline"}
                className="flex h-10 w-32 items-center justify-center gap-2 font-light md:h-16 md:w-52 md:text-xl"
              >
                Get Started
              </Button>
            </SignInButton>
          </SignedOut>
        </div>
      </div>

      <Line type="vertical" className="absolute right-10 md:right-20 lg:right-32" />
      <Line />
    </main>
  )
}
