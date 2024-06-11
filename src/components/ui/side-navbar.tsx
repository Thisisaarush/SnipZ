import Image from "next/image"
import { Button } from "./button"
import { ScrollArea } from "./scroll-area"
import { Separator } from "./separator"
import { categoriesData } from "@/lib/categories-data"

const SideNavBar = () => {
  return (
    <nav className="sticky top-0 max-h-screen min-w-fit border-r">
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
                        <div key={index}>
                          <Button
                            variant={"ghost"}
                            className="w-full justify-start gap-2 px-8 text-sm font-normal capitalize"
                          >
                            <Image src={item?.icon} alt="technology" width={15} height={15} />
                            {item.name}
                          </Button>
                        </div>
                      )
                    })}
                  </div>
                </div>
                <Separator className="my-4 last-of-type:hidden" />
              </li>
            )
          })}
        </ul>
      </ScrollArea>
    </nav>
  )
}

export default SideNavBar
