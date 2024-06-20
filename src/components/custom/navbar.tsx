"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { ClerkLoading, SignInButton, SignedIn, SignedOut, UserButton, useUser } from "@clerk/nextjs"
import { Avatar, AvatarFallback } from "../ui/avatar"
import { ModeToggle } from "../theme/mode-toggle"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { Plus, Search, X } from "lucide-react"

export const NavBar = () => {
  const pathname = usePathname()
  const [isSearchOpen, setIsOpenSearch] = useState(false)
  const { user, isLoaded, isSignedIn } = useUser()

  const id = user?.id ?? ""
  const name = user?.fullName ?? ""
  const email = user?.primaryEmailAddress?.emailAddress ?? ""
  const createdAt = user?.createdAt
  const imageUrl = user?.imageUrl

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch("/api/createUser", {
          method: "POST",
          body: JSON.stringify({ id, name, email, createdAt }),
          headers: {
            "Content-Type": "application/json"
          }
        })

        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`)
        }
      } catch (error) {
        console.error("An error occurred while fetching the user:", error)
      }
    }

    if (isSignedIn && isLoaded) {
      fetchUser()
    }
  }, [isSignedIn, isLoaded, id, name, email, createdAt])

  return (
    <nav
      className={`flex justify-center ${pathname === "/" ? "absolute left-1/2 top-6 w-[95%] max-w-2xl -translate-x-1/2 md:w-full" : "border-b"}`}
    >
      <div className="flex w-full max-w-4xl items-center justify-between px-10 py-4">
        <Link href="/" className={`p-2 font-bold lg:text-lg`}>
          SnipZ
        </Link>

        <div className="flex items-center justify-center gap-2 text-sm">
          {!isSearchOpen && (
            <>
              <Link href="/snips" className="p-2">
                All Snippets
              </Link>

              <SignedOut>
                <ClerkLoading>
                  <button className="p-2">Sign in</button>
                </ClerkLoading>
                <SignInButton>
                  <button className="p-2">Sign in</button>
                </SignInButton>
              </SignedOut>

              <SignedIn>
                <ClerkLoading>
                  <Avatar className="m-2 size-[25px]">
                    <AvatarFallback />
                  </Avatar>
                </ClerkLoading>
                <UserButton appearance={{ elements: { userButtonAvatarBox: "size-[25px] m-2" } }} />
              </SignedIn>

              <span className="text-gray-400">|</span>
              {isSignedIn && isLoaded && (
                <Button variant="default" size={"sm"} asChild>
                  <Link href="/snips/create" className="flex gap-1">
                    <Plus className="h-[16px] w-[16px]" />
                    <p>Create</p>
                  </Link>
                </Button>
              )}
            </>
          )}

          {!isSearchOpen ? (
            <Button variant="outline" size={"icon"} onClick={() => setIsOpenSearch(true)}>
              <Search className="h-[20px] w-[20px]" />
            </Button>
          ) : (
            <>
              <form action="/search" method="get" className="flex items-center gap-2">
                <Input type="search" name="query" placeholder="Search" />
                <Button variant="outline" type="submit">
                  <Search className="h-[20px] w-[20px]" />
                </Button>
                <Button variant="outline" onClick={() => setIsOpenSearch(false)}>
                  <X className="h-[20px] w-[20px]" />
                </Button>
              </form>
            </>
          )}

          {!isSearchOpen && (
            <>
              <Button variant="outline" asChild size={"icon"}>
                <Link href="https://github.com/Thisisaarush/SnipZ">
                  <Image
                    className="cursor-pointer dark:invert"
                    src={"/github.svg"}
                    alt="github link"
                    width={20}
                    height={20}
                  />
                </Link>
              </Button>

              <ModeToggle />
            </>
          )}
        </div>
      </div>
    </nav>
  )
}
