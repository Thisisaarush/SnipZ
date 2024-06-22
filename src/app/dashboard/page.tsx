"use client"

import { useEffect } from "react"
import { useUser } from "@clerk/nextjs"

const DashboardPage = () => {
  const { user, isLoaded, isSignedIn } = useUser()
  const email = user?.primaryEmailAddress?.emailAddress || ""

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
      } catch (error) {
        console.error("An error occurred while getting snips:", error)
      }
    }

    if (isSignedIn && isLoaded) {
      fetchSnips()
    }
  }, [email, isLoaded, isSignedIn])

  return (
    <div>
      <h1>Dashboard</h1>
    </div>
  )
}

export default DashboardPage
