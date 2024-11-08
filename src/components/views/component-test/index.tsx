import { FC } from "@/utils/types"
import React from "react"
// import Radios from "./Radios"
import Buttons from "./Buttons"
import Badges from "./Badges"
import Chips from "./Chips"
import OtpInput from "@/components/molecules/Inputs/OtpInput"
import Tooltip from "@/components/molecules/Tooltip"

const ComponentTest: FC = () => {
  return (
    <div className="p-10 flex flex-col gap-10 flex-wrap">
      {/* <Radios /> */}
      <Buttons />
      <Badges />
      <Chips />
      <OtpInput />

      <Tooltip
        position="left"
        alignment="start"
        reference={<>I have tooltip</>}
        classNames={{ tooltip: "w-96" }}
      >
        I am the tooltip. Lorem, ipsum dolor sit amet consectetur adipisicing
        elit. Fugit, expedita facilis molestiae illo illum quo ducimus est
        deserunt voluptas ipsum, nesciunt ut nulla quia suscipit consequatur
        soluta fuga vitae impedit.
      </Tooltip>
    </div>
  )
}

export default ComponentTest
