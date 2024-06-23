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
import { Menu, Plus, Search, X } from "lucide-react"

export const NavBar = () => {
  const pathname = usePathname()
  const [isSearchOpen, setIsOpenSearch] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const { user, isLoaded, isSignedIn } = useUser()

  const name = user?.fullName ?? ""
  const email = user?.primaryEmailAddress?.emailAddress ?? ""
  const createdAt = user?.createdAt

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch("/api/createUser", {
          method: "POST",
          body: JSON.stringify({ name, email, createdAt }),
          headers: {
            "Content-Type": "application/json"
          }
        })

        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`)
        }
      } catch (error) {
        console.error("An error occurred while creating the user:", error)
      }
    }

    if (isSignedIn && isLoaded) {
      fetchUser()
    }
  }, [createdAt, email, isLoaded, isSignedIn, name])

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  const [windowWidth, setWindowWidth] = useState(window.innerWidth)

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth)
    }
    window.addEventListener("resize", handleResize)

    return () => window.removeEventListener("resize", handleResize)
  }, [])

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "auto"
    }
  }, [isMobileMenuOpen])

  const IsMobile = () => {
    return windowWidth <= 768
  }

  return (
    <nav
      className={`flex justify-center ${pathname === "/" ? "absolute left-1/2 top-0 w-full max-w-3xl -translate-x-1/2 md:w-full" : "border-b"} `}
    >
      <div className="flex w-full max-w-5xl items-center justify-between px-10 py-4">
        <Link href="/" className={`p-2 font-bold lg:text-lg`}>
          SnipZ
        </Link>
        {!IsMobile() && (
          <div className="flex items-center justify-center gap-2 text-sm">
            {!isSearchOpen && (
              <>
                <Button variant="link" size={"sm"} asChild>
                  <Link href="/snips">All Snippets</Link>
                </Button>
                {isSignedIn && isLoaded && (
                  <Button variant="link" size={"sm"} asChild>
                    <Link href="/dashboard">Dashboard</Link>
                  </Button>
                )}

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
                  <UserButton
                    appearance={{ elements: { userButtonAvatarBox: "size-[25px] m-2" } }}
                  />
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
          </div>
        )}

        {
          // Mobile Menu
        }
        {IsMobile() && !isMobileMenuOpen && (
          <Button variant="outline" size={"icon"} onClick={toggleMobileMenu}>
            <Menu className="h-[20px] w-[20px]" />
          </Button>
        )}

        {IsMobile() && isMobileMenuOpen && (
          <div className="absolute right-0 top-0 z-50 flex min-h-screen w-[80%] flex-col items-start gap-8 bg-gray-50 p-4 shadow-md dark:bg-gray-900">
            <Button
              variant="destructive"
              size={"icon"}
              onClick={toggleMobileMenu}
              className="w-full"
            >
              <X className="h-[20px] w-[20px]" />
            </Button>
            <form action="/search" method="get" className="flex w-full items-center gap-2">
              <Input type="search" name="query" placeholder="Search" />
              <Button variant="outline" type="submit">
                <Search className="h-[20px] w-[20px]" />
              </Button>
            </form>

            <div className="flex w-full flex-col items-center justify-center gap-4 text-sm">
              <Button
                variant="outline"
                size={"sm"}
                className="w-full"
                onClick={toggleMobileMenu}
                asChild
              >
                <Link href="/snips">All Snippets</Link>
              </Button>
              {isSignedIn && isLoaded && (
                <Button
                  variant="outline"
                  size={"sm"}
                  className="w-full"
                  onClick={toggleMobileMenu}
                  asChild
                >
                  <Link href="/dashboard">Dashboard</Link>
                </Button>
              )}

              <Button variant="outline" asChild size={"icon"} className="w-full">
                <Link href="https://github.com/Thisisaarush/SnipZ" className="flex gap-4">
                  <Image
                    className="cursor-pointer dark:invert"
                    src={"/github.svg"}
                    alt="github link"
                    width={20}
                    height={20}
                  />
                  <p>GitHub</p>
                </Link>
              </Button>

              {isSignedIn && isLoaded && (
                <Button
                  variant="default"
                  size={"sm"}
                  className="w-full"
                  onClick={toggleMobileMenu}
                  asChild
                >
                  <Link href="/snips/create" className="flex gap-1">
                    <Plus className="h-[16px] w-[16px]" />
                    <p>Create</p>
                  </Link>
                </Button>
              )}

              <div className="flex justify-between gap-4">
                <SignedOut>
                  <ClerkLoading>
                    <button className="w-full p-2">Sign in</button>
                  </ClerkLoading>
                  <SignInButton>
                    <button className="w-full p-2">Sign in</button>
                  </SignInButton>
                </SignedOut>

                <SignedIn>
                  <ClerkLoading>
                    <Avatar className="m-2 size-[25px]">
                      <AvatarFallback />
                    </Avatar>
                  </ClerkLoading>
                  <UserButton
                    appearance={{
                      elements: { userButtonAvatarBox: "size-[25px] m-2" }
                    }}
                  />
                </SignedIn>

                <ModeToggle />
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
