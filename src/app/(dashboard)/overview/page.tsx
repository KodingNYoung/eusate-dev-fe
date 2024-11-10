import { PageFC } from "@/utils/types"
import React, { Suspense } from "react"

const Overview: PageFC = () => {
  return (
    <Suspense fallback={<>loading overview fallback...</>}>
      <div>Overview</div>
    </Suspense>
  )
}

export default Overview
