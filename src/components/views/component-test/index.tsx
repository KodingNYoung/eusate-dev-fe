import { FC } from "@/utils/types"
import React from "react"
import Radios from "./Radios"
import Buttons from "./Buttons"
import Badges from "./Badges"
import Chips from "./Chips"

const ComponentTest: FC = () => {
  return (
    <div className="p-10 flex flex-col gap-10 flex-wrap">
      <Radios />
      <Buttons />
      <Badges />
      <Chips />
    </div>
  )
}

export default ComponentTest
