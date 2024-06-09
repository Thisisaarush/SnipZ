"use client"

import { getAllPublicGists, getPaginatedPublicGists, getRateLimit } from "@/lib/utils"
import { useQuery } from "@tanstack/react-query"
import { useCallback, useEffect, useState } from "react"

const Snips = () => {
  const { status, data, error } = useQuery({
    queryKey: ["allPaginatedPublicGists"],
    queryFn: () => getPaginatedPublicGists(1, 10)
  })

  console.log({ status, data, error })

  if (status === "pending") return <div>Loading...</div>

  return (
    <div>
      <div>Snips</div>
    </div>
  )
}

export default Snips
