import { FC } from "@/utils/types"
import React from "react"
import FunctionCard from "./_components/FunctionCard"

const DevSpaceFunctions: FC = () => {
  return (
    <div className="grid grid-cols-[repeat(auto-fit,_minmax(410px,_1fr))] gap-5">
      <FunctionCard />
      <FunctionCard />
      <FunctionCard isLive />
      <FunctionCard />
      <FunctionCard isLive />
    </div>
  )
}

export default DevSpaceFunctions
