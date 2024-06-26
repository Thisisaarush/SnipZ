"use client"

import { Suspense, useCallback, useEffect, useState } from "react"
import { useQuery } from "@tanstack/react-query"
import { getPaginatedPublicGists } from "@/lib/utils"
import { useSearchParams } from "next/navigation"
import SnipCards from "@/components/custom/snip-cards"

const SearchPage = () => {
  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        <SearchPageContent />
      </Suspense>
    </>
  )
}

const SearchPageContent = () => {
  const searchQuery = useSearchParams().get("query") || ""
  const [filteredData, setFilteredData] = useState<{ [key: string]: any }[]>([])

  const { status, data, error } = useQuery({
    queryKey: ["allPaginatedPublicGists"],
    queryFn: () => getPaginatedPublicGists(1, 100)
  })

  useEffect(() => {
    // filter gists based on search query
    const filteredData = data?.filter((gist: { [key: string]: any }) => {
      const files = Object.values(gist.files)
      return files.some((file: any) => {
        return (
          file.language?.toLowerCase() === searchQuery || gist?.description?.includes(searchQuery)
        )
      })
    })
    setFilteredData(() => filteredData)
  }, [data, searchQuery])

  if (status === "pending")
    return <div className="flex h-screen w-full items-center justify-center">Loading...</div>

  if (status === "error")
    return <div className="flex h-screen w-full items-center justify-center">{error?.name}</div>

  if (filteredData?.length === 0)
    return <div className="flex h-screen w-full items-center justify-center">No results found</div>

  return (
    <div className="my-10 flex w-full flex-col gap-8 p-2">
      <h1 className="text-2xl font-bold md:text-4xl">Search and Filter</h1>
      <div className="flex items-center gap-4">
        <h2>Results for: {searchQuery}</h2>
        <h3>Total results: {filteredData?.length}</h3>
      </div>

      <SnipCards snipData={filteredData} />
    </div>
  )
}

export default SearchPage
