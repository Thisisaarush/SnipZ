"use client"

import { Suspense, useCallback, useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import { useQuery } from "@tanstack/react-query"
import { getAllPublicGists, getPaginatedPublicGists, getRateLimit } from "@/lib/utils"

import SnipCards from "@/components/custom/snip-cards"
import SnipsPagination from "@/components/custom/snips-pagination"
import SideNavBar from "@/components/custom/side-navbar"

const SnipsListingPage = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SnipsListingContent />
    </Suspense>
  )
}
const SnipsListingContent = () => {
  const searchParam = useSearchParams()
  const pageNumber = Number(searchParam.get("page"))
  const currentPage = pageNumber < 1 ? 1 : pageNumber > 300 ? 300 : pageNumber || 1
  const totalPages = new Array(300).fill(0).map((_, i) => i + 1)

  const { status, data, error } = useQuery({
    queryKey: ["allPaginatedPublicGists", currentPage],
    queryFn: () => getPaginatedPublicGists(currentPage, 10)
  })

  if (status === "pending")
    return <div className="flex h-screen w-full items-center justify-center">Loading...</div>

  if (status === "error")
    return <div className="flex h-screen w-full items-center justify-center">{error?.name}</div>

  return (
    <div className="m-auto flex w-full justify-center gap-10 p-2">
      <SideNavBar />
      <div className="my-10 flex w-full max-w-2xl flex-col gap-10">
        <h1 className="font-medium text-lg">All Snippets</h1>
        <SnipCards snipData={data} />
        <SnipsPagination currentPage={currentPage} totalPages={totalPages} />
      </div>
    </div>
  )
}

export default SnipsListingPage
