"use client"

import { useCallback, useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import { useQuery } from "@tanstack/react-query"
import { getAllPublicGists, getPaginatedPublicGists, getRateLimit } from "@/lib/utils"

import SnipCards from "@/components/custom/snip-cards"
import SnipsPagination from "@/components/custom/snips-pagination"
import SideNavBar from "@/components/custom/side-navbar"

const SnipsListingPage = () => {
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
    return <div className="flex h-screen w-full items-center justify-center">Loading...</div>

  if (status === "error")
    return <div className="flex h-screen w-full items-center justify-center">{error?.name}</div>

  return (
    <div className="m-auto flex w-full justify-center gap-10">
      <SideNavBar />
      <div className="my-10 flex w-full max-w-2xl flex-col gap-10">
        <SnipCards snipData={data} />
        <SnipsPagination currentPage={currentPage} totalPages={totalPages} />
      </div>
    </div>
  )
}

export default SnipsListingPage
