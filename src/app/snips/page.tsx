"use client"

import { useCallback, useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { useQuery } from "@tanstack/react-query"
import { getAllPublicGists, getPaginatedPublicGists, getRateLimit } from "@/lib/utils"
import SnipCard from "@/components/ui/snip-card"

const Snips = () => {
  const { status, data, error } = useQuery({
    queryKey: ["allPaginatedPublicGists"],
    queryFn: () => getPaginatedPublicGists(1, 30)
  })

  console.log({ status, data, error })

  // filter gists based on language
  // const filterByLanguage = useCallback(
  //   (language: string) => {
  //     const filteredData = data?.filter((gist: { [key: string]: any }) => {
  //       const files = Object.values(gist.files)
  //       const file = files[0] as { [Key: string]: any }
  //       return file.language?.toLowerCase() === language?.toLowerCase()
  //     })
  //     console.log(filteredData)
  //   },
  //   [data]
  // )

  // useEffect(() => {
  //   filterByLanguage("python")
  // }, [filterByLanguage])

  if (status === "pending")
    return <div className="flex h-screen w-full items-center justify-center">Loading...</div>

  return (
    <div className="flex w-full max-w-4xl flex-col justify-center gap-10 p-8">
      <SnipCard snipData={data} />
    </div>
  )
}

export default Snips
