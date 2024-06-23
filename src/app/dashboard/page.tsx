"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { useUser } from "@clerk/nextjs"
import CodeBlock from "@/components/custom/code-block"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Copy, CopyCheck } from "lucide-react"

// function to identify the programming language by the file extension
function identifyLanguageByExtension(fileName: string): string {
  const extensionToLanguageMap: { [key: string]: string } = {
    ".js": "JavaScript",
    ".jsx": "JavaScript",
    ".ts": "TypeScript",
    ".tsx": "TypeScript",
    ".py": "Python",
    ".java": "Java",
    ".cs": "C#",
    ".cpp": "C++",
    ".rb": "Ruby",
    ".php": "PHP",
    ".html": "HTML",
    ".css": "CSS",
    ".scss": "SASS/SCSS",
    ".md": "Markdown",
    ".json": "JSON",
    ".xml": "XML",
    ".yml": "YAML",
    ".yaml": "YAML",
    ".sh": "Shell",
    ".bash": "Shell",
    ".ps1": "PowerShell",
    ".psm1": "PowerShell",
    ".sql": "SQL",
    ".go": "Go",
    ".rs": "Rust",
    ".kt": "Kotlin",
    ".swift": "Swift",
    ".groovy": "Groovy",
    ".lua": "Lua",
    ".r": "R",
    ".pl": "Perl",
    ".scala": "Scala",
    ".tsql": "Transact-SQL",
    ".vb": "Visual Basic",
    ".vbs": "Visual Basic",
    ".vba": "Visual Basic",
    ".vbscript": "VBScript",
    ".asm": "Assembly",
    ".ahk": "AutoHotkey",
    ".bat": "Batch",
    ".cmd": "Batch",
    ".c": "C",
    ".h": "C",
    ".hbs": "Handlebars",
    ".ejs": "EJS",
    ".elm": "Elm",
    ".erl": "Erlang",
    ".f": "Fortran",
    ".f90": "Fortran",
    ".f95": "Fortran"
  }

  const extension = fileName.slice(fileName.lastIndexOf(".")).toLowerCase()
  const language = extensionToLanguageMap[extension]

  return language?.toLowerCase() || ""
}

const DashboardPage = () => {
  const { user, isLoaded, isSignedIn } = useUser()
  const email = user?.primaryEmailAddress?.emailAddress || ""

  const [snips, setSnips] = useState([])
  const [currentUser, setCurrentUser] = useState<{ [key: string]: any }>({})
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

  useEffect(() => {
    const fetchSnips = async () => {
      try {
        const res = await fetch("/api/getUserSnips", {
          method: "POST",
          body: JSON.stringify({ email }),
          headers: {
            "Content-Type": "application/json"
          }
        })

        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`)
        }

        const data = await res.json()
        console.log(data)
        setSnips(data.snips?.reverse())
        setCurrentUser(data.user)
      } catch (error) {
        console.error("An error occurred while getting snips:", error)
      }
    }

    if (isSignedIn && isLoaded) {
      fetchSnips()
    }
  }, [email, isLoaded, isSignedIn])

  return (
    <div className="m-auto my-10 flex max-w-4xl flex-col gap-10 p-4">
      <h1 className="text-xl font-medium">Your Snips</h1>
      <div className="flex max-w-4xl flex-col gap-10">
        {snips?.map((snip: { [key: string]: any }, index: number) => {
          return (
            <Card key={snip.id}>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <p>by</p>

                  <p>{currentUser?.name}</p>
                </div>
                <p className="overflow-hidden text-ellipsis text-sm text-gray-500">
                  {snip.description}
                </p>
              </CardHeader>

              <CardContent className="flex flex-col gap-2 overflow-hidden text-ellipsis bg-gray-100 py-4 dark:bg-gray-900">
                {snip.snipUrls.map((url: string, idx: number) => {
                  return (
                    <Dialog key={snip.id + url}>
                      <DialogTrigger asChild>
                        <Button
                          variant={"link"}
                          size={"sm"}
                          onClick={() => {
                            setCurrentFileLanguage(identifyLanguageByExtension(url))
                            setCurrentFileUrl(url)
                          }}
                          className="w-fit cursor-pointer text-sm text-blue-700 hover:underline dark:text-blue-600"
                        >
                          {snip.fileNames[idx] + url.slice(url.lastIndexOf("."))}
                        </Button>
                      </DialogTrigger>

                      <DialogContent className="w-max max-w-4xl">
                        <DialogHeader>
                          <div className="flex items-center gap-2">
                            <DialogTitle>
                              {snip.fileNames[idx] + url.slice(url.lastIndexOf("."))}
                            </DialogTitle>
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
                          <DialogDescription>{identifyLanguageByExtension(url)}</DialogDescription>
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
              {/* <CardFooter className="mt-4">
                <Button variant={"default"} asChild>
                  <Link href={`/snips/${snip?.id}`}>Open</Link>
                </Button>
              </CardFooter> */}
            </Card>
          )
        })}
      </div>
    </div>
  )
}

export default DashboardPage
