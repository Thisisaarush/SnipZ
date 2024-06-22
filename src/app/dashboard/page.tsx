"use client"

import { useEffect, useState } from "react"
import { useUser } from "@clerk/nextjs"
import CodeBlock from "@/components/custom/code-block"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import SnipCards from "@/components/custom/snip-cards"

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
    ".xml": "XML"
  }

  const extension = fileName.slice(fileName.lastIndexOf(".")).toLowerCase()
  const language = extensionToLanguageMap[extension]

  return language?.toLowerCase() || ""
}

const DashboardPage = () => {
  const { user, isLoaded, isSignedIn } = useUser()
  const email = user?.primaryEmailAddress?.emailAddress || ""

  const [snips, setSnips] = useState([])

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
        console.log("Snips:", data.snips)
        setSnips(data.snips)
      } catch (error) {
        console.error("An error occurred while getting snips:", error)
      }
    }

    if (isSignedIn && isLoaded) {
      fetchSnips()
    }
  }, [email, isLoaded, isSignedIn])

  return (
    <div className="m-auto min-h-screen max-w-5xl py-4">
      <h1>Dashboard</h1>
    </div>
  )
}

export default DashboardPage
