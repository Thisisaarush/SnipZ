"use client"
import Image from "next/image"
import Link from "next/link"
import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs"
import { usePathname } from "next/navigation"

export const NavBar = () => {
  const pathname = usePathname()

  return (
    <nav
      className={`flex justify-center ${pathname === "/" ? "absolute left-1/2 top-6 w-[95%] max-w-2xl -translate-x-1/2 md:w-full" : ""}`}
    >
      <div className="flex w-full max-w-4xl items-center justify-between px-10 py-6">
        <Link href={"/"} className="p-2 font-bold lg:text-lg">
          SnipZ
        </Link>

        <div className="flex items-center justify-center gap-2 text-sm">
          <Link href="/snips" className="p-2">
            All Snippets
          </Link>

          <SignedOut>
            <SignInButton>
              <button className="p-2">Sign in</button>
            </SignInButton>
          </SignedOut>
          <SignedIn>
            <UserButton appearance={{ elements: { userButtonAvatarBox: "size-[25px] m-2" } }} />
          </SignedIn>

          <span className="text-gray-400">|</span>

          <Link href="https://github.com/Thisisaarush/SnipZ" className="p-2">
            <Image
              className="cursor-pointer dark:invert"
              src={"/github.svg"}
              alt="github link"
              width={25}
              height={25}
            />
          </Link>
        </div>
      </div>
    </nav>
  )
}
