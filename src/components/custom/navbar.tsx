"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { ClerkLoading, SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs"
import { usePathname } from "next/navigation"
import { Avatar, AvatarFallback } from "../ui/avatar"
import { ModeToggle } from "../theme/mode-toggle"
import { Button } from "../ui/button"
import { Cross, Search, X } from "lucide-react"
import { Input } from "../ui/input"

export const NavBar = () => {
  const pathname = usePathname()
  const [isSearchOpen, setIsOpenSearch] = useState(false)

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
                    <AvatarFallback></AvatarFallback>
                  </Avatar>
                </ClerkLoading>
                <UserButton appearance={{ elements: { userButtonAvatarBox: "size-[25px] m-2" } }} />
              </SignedIn>

              <span className="text-gray-400">|</span>
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
