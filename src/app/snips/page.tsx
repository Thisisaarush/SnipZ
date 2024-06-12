"use client"

import { useSearchParams } from "next/navigation"
import { useQuery } from "@tanstack/react-query"
import { getAllPublicGists, getPaginatedPublicGists, getRateLimit } from "@/lib/utils"

import SnipCards from "@/components/custom/snip-cards"
import SnipsPagination from "@/components/custom/snips-pagination"
import { useCallback, useEffect, useState } from "react"

const Snips = () => {
  const searchParam = useSearchParams()
  const pageNumber = Number(searchParam.get("page"))
  const currentPage = pageNumber < 1 ? 1 : pageNumber > 300 ? 300 : pageNumber || 1
  const totalPages = new Array(300).fill(0).map((_, i) => i + 1)

  const { status, data, error } = useQuery({
    queryKey: ["allPaginatedPublicGists", currentPage],
    queryFn: () => getPaginatedPublicGists(currentPage, 10)
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
    return (
      <div className="flex h-screen w-full max-w-4xl items-center justify-center">Loading...</div>
    )

  return (
    <div className="flex w-full max-w-4xl flex-col gap-10 p-8">
      <SnipCards snipData={data} />
      <SnipsPagination currentPage={currentPage} totalPages={totalPages} />
    </div>
  )
}

export default Snips
