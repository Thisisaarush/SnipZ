import Image from "next/image"
import { Card, CardContent, CardFooter, CardHeader } from "./card"
import Link from "next/link"
import { Button } from "./button"

interface SnipCardProps {
  snipData: { [key: string]: any }
}

const SnipCard: React.FC<SnipCardProps> = ({ snipData }) => {
  return (
    <>
      {snipData?.map((gist: { [key: string]: any }) => {
        const files = Object.values(gist.files)
        const file = files[0] as { [Key: string]: any }
        return (
          <Card key={gist.id}>
            <CardHeader>
              <div className="flex items-center gap-2">
                <p>by</p>
                <Image
                  src={gist?.owner?.avatar_url}
                  alt="user"
                  width={20}
                  height={20}
                  className="rounded-full"
                />
                <p>{gist?.owner?.login}</p>
              </div>
              <p className="overflow-hidden text-ellipsis text-sm text-gray-500">
                {gist?.description}
              </p>
            </CardHeader>

            <CardContent className="flex flex-col gap-2 bg-gray-100 py-4 dark:bg-gray-900">
              {Object.values(gist.files).map((file: any) => {
                return (
                  <Link
                    href={file?.raw_url}
                    key={file?.filename}
                    className="w-fit text-sm text-blue-700 hover:underline dark:text-blue-600"
                  >
                    {file.filename}
                  </Link>
                )
              })}
            </CardContent>

            <CardFooter className="py-2">
              <Link href={gist.html_url} target="_blank" className="py-2">
                <Button variant={"secondary"}>View on GitHub</Button>
              </Link>
            </CardFooter>
          </Card>
        )
      })}
    </>
  )
}

export default SnipCard
