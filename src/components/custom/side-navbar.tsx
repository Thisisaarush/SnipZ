import Image from "next/image"
import { Button } from "../ui/button"
import { ScrollArea } from "../ui/scroll-area"
import { categoriesData } from "@/lib/categories-data"
import { memo } from "react"
import Link from "next/link"

const SideNavBar = memo(function SideNavBar() {
  return (
    <nav className="sticky top-0 max-h-screen min-h-screen min-w-fit border-r">
      <ScrollArea className="h-full">
        <h1 className="mx-8 my-6 text-lg font-medium">Filter by</h1>

        <ul>
          {categoriesData?.map((category, index) => {
            return (
              <li key={index}>
                <div className="my-4">
                  <h2 className="font-sm mx-8 capitalize text-gray-400">
                    {Object.keys(category)[0]}
                  </h2>
                  <div className="m-4 flex flex-col gap-1">
                    {Object.values(category)[0].map((item, index) => {
                      return (
                        <Button
                          key={index}
                          variant={"ghost"}
                          className="w-full justify-start gap-2 px-8 text-sm font-normal capitalize"
                          asChild
                        >
                          <Link href={`/search?query=${item.name.toLowerCase()}`}>
                            <Image src={item?.icon} alt="technology" width={15} height={15} />
                            {item.name}
                          </Link>
                        </Button>
                      )
                    })}
                  </div>
                </div>
              </li>
            )
          })}
        </ul>
      </ScrollArea>
    </nav>
  )
})

export default SideNavBar
