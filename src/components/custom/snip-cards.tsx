"use client"

import Image from "next/image"
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card"
import Link from "next/link"
import { Button } from "../ui/button"
import { useState } from "react"
import CodeBlock from "./code-block"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog"
import { ScrollArea } from "../ui/scroll-area"

interface SnipCardProps {
  snipData: { [key: string]: any }
}

const SnipCards: React.FC<SnipCardProps> = ({ snipData }) => {
  const [currentFileLanguage, setCurrentFileLanguage] = useState("")
  const [currentFileUrl, setCurrentFileUrl] = useState("")

  console.log({ currentFileLanguage, currentFileUrl })

  return (
    <>
      {snipData?.map((gist: { [key: string]: any }) => {
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
                  <Dialog key={file?.filename}>
                    <DialogTrigger asChild>
                      <p
                        onClick={() => {
                          setCurrentFileLanguage(file?.language?.toLowerCase())
                          setCurrentFileUrl(file?.raw_url)
                        }}
                        className="w-fit cursor-pointer text-sm text-blue-700 hover:underline dark:text-blue-600"
                      >
                        {file?.filename}
                      </p>
                    </DialogTrigger>

                    <DialogContent className="w-max max-w-5xl">
                      <DialogHeader>
                        <DialogTitle>{file?.filename}</DialogTitle>
                        <DialogDescription>{file?.language}</DialogDescription>
                      </DialogHeader>

                      <ScrollArea className="max-h-[80vh]">
                        <CodeBlock fileUrl={currentFileUrl} language={currentFileLanguage} />
                      </ScrollArea>
                    </DialogContent>
                  </Dialog>
                )
              })}
            </CardContent>

            <CardFooter className="py-4">
              <Button variant={"secondary"} asChild>
                <Link href={gist.html_url} target="_blank">
                  View on GitHub
                </Link>
              </Button>
            </CardFooter>
          </Card>
        )
      })}
    </>
  )
}

export default SnipCards
