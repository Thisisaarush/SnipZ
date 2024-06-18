"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "../ui/button"
import CodeBlock from "./code-block"
import { ScrollArea, ScrollBar } from "../ui/scroll-area"
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "../ui/dialog"
import { Copy, CopyCheck } from "lucide-react"

interface SnipCardProps {
  snipData: { [key: string]: any }[]
}

const SnipCards: React.FC<SnipCardProps> = ({ snipData }) => {
  const [currentFileLanguage, setCurrentFileLanguage] = useState("")
  const [currentFileUrl, setCurrentFileUrl] = useState("")
  const [isCopied, setIsCopied] = useState(false)

  const handleCopyToClipboard = async () => {
    try {
      const response = await fetch(currentFileUrl)
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      const codeText = await response.text()
      navigator?.clipboard?.writeText(codeText)
      setIsCopied(true)
    } catch (error) {
      console.error("Error fetching the code:", error)
    }
  }

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

            <CardContent className="flex flex-col gap-2 overflow-hidden text-ellipsis bg-gray-100 py-4 dark:bg-gray-900">
              {Object.values(gist.files).map((file: any) => {
                return (
                  <Dialog key={file?.filename}>
                    <DialogTrigger asChild>
                      <Button
                        variant={"link"}
                        size={"sm"}
                        onClick={() => {
                          setCurrentFileLanguage(file?.language)
                          setCurrentFileUrl(file?.raw_url)
                        }}
                        className="w-fit cursor-pointer text-sm text-blue-700 hover:underline dark:text-blue-600"
                      >
                        {file?.filename}
                      </Button>
                    </DialogTrigger>

                    <DialogContent className="w-max max-w-4xl">
                      <DialogHeader>
                        <div className="flex items-center gap-2">
                          <DialogTitle>{file?.filename}</DialogTitle>
                          <Button
                            variant={"outline"}
                            size={"sm"}
                            onClick={handleCopyToClipboard}
                            className="flex w-fit gap-2"
                          >
                            {isCopied ? (
                              <>
                                <CopyCheck size={"16px"} />
                                <p>Copied!</p>
                              </>
                            ) : (
                              <>
                                <Copy size={"16px"} />
                                <p>Copy</p>
                              </>
                            )}
                          </Button>
                        </div>
                        <DialogDescription>{file?.language}</DialogDescription>
                      </DialogHeader>

                      <ScrollArea className="max-h-[80vh]">
                        <CodeBlock fileUrl={currentFileUrl} language={currentFileLanguage} />
                        <ScrollBar orientation="horizontal" />
                      </ScrollArea>
                    </DialogContent>
                  </Dialog>
                )
              })}
            </CardContent>

            <CardFooter className="flex gap-4 py-4">
              <Button variant={"default"} asChild>
                <Link href={`/snips/${gist?.id}`}>Open</Link>
              </Button>
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
