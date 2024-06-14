"use client"

import CodeBlock from "@/components/custom/code-block"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { getGistById } from "@/lib/utils"
import { useQuery } from "@tanstack/react-query"
import Image from "next/image"

interface SnipDetailPageProps {
  params: { id: string }
}

const SnipDetailPage: React.FC<SnipDetailPageProps> = ({ params }) => {
  const snipId = params?.id

  const { status, data, error } = useQuery({
    queryKey: ["allPaginatedPublicGists", snipId],
    queryFn: () => getGistById(snipId)
  })

  const createdAt = new Date(data?.created_at).toLocaleString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    hour12: true,
    timeZoneName: "short"
  })

  if (status === "pending")
    return <div className="flex h-screen w-full items-center justify-center">Loading...</div>

  if (status === "error")
    return <div className="flex h-screen w-full items-center justify-center">{error?.name}</div>

  return (
    <div className="m-auto my-8 w-full max-w-4xl p-8">
      <div className="flex flex-col gap-6">
        <h1 className="text-2xl font-bold md:text-3xl">{data?.description}</h1>
        <div className="flex gap-2">
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <p>by</p>
              <Image
                src={data?.owner?.avatar_url}
                alt="user"
                width={20}
                height={20}
                className="rounded-full"
              />
              <p>{data?.owner?.login}</p>
            </div>
            <p className="text-sm text-gray-500">{createdAt}</p>
          </div>
        </div>

        <Separator />

        <div className="flex flex-col gap-10">
          {Object?.values(data?.files).map((file: any) => (
            <div key={file.filename} className="flex flex-col gap-2">
              <p className="text-balance font-medium">{file?.filename}</p>
              <p className="text-sm text-gray-500">{file?.language}</p>
              <ScrollArea className="w-full max-w-4xl rounded-md border">
                <div className="h-fit max-h-[500px]">
                  <CodeBlock fileUrl={file?.raw_url} language={file?.language} />
                </div>
                <ScrollBar orientation="horizontal" />
              </ScrollArea>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default SnipDetailPage
