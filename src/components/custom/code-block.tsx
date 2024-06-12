"use client"

import { useEffect, useState } from "react"
import Prism from "prismjs"
import "@/styles/prismjs-theme.css"

interface CodeBlockProps {
  fileUrl: string
  language: string
}

const CodeBlock: React.FC<CodeBlockProps> = ({ fileUrl = "", language = "" }) => {
  const [code, setCode] = useState("")

  // Load the language for syntax highlighting
  useEffect(() => {
    import(`prismjs/components/prism-${language}`)
      .then(() => Prism.highlightAll())
      .catch((err) => console.log(`Failed to load language: ${language}`, err))
  }, [language, code])

  // Fetch the code from the fileUrl
  useEffect(() => {
    const fetchCode = async () => {
      const url = fileUrl
      try {
        const response = await fetch(url)
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        const codeText = await response.text()
        setCode(codeText)
      } catch (error) {
        console.error("Error fetching the code:", error)
      }
    }

    fetchCode()
  }, [fileUrl])

  return (
    <pre>
      <code className={`language-${language} text-wrap`}>{code}</code>
    </pre>
  )
}

export default CodeBlock
