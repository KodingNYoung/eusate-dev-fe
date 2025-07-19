import { FC } from "@/utils/types"
import React from "react"
import Radios from "./Radios"
import Buttons from "./Buttons"
import Badges from "./Badges"
import Chips from "./Chips"
import OtpInput from "@/components/molecules/Inputs/OtpInput"
import Tooltip from "@/components/molecules/Tooltip"

const ComponentTest: FC = () => {
  return (
    <div className="p-10 flex flex-col gap-10 flex-wrap bg-white">
      <Radios />
      <Buttons />
      <Badges />
      <Chips />
      <OtpInput />
      <div className="flex items-center justify-center">
        <Tooltip
          placement="bottom"
          content={
            <>
              I am the tooltip. Lorem, ipsum dolor sit amet consectetur
              adipisicing elit. Fugit, expedita facilis molestiae illo illum quo
              ducimus est deserunt voluptas ipsum, nesciunt ut
            </>
          }
          classNames={{ content: "w-96 p-2.5 rounded-xl" }}
        >
          I have tooltip nulla quia suscipit consequatur soluta fuga vitae
          impedit.
        </Tooltip>
      </div>
    </div>
  )
}

export default ComponentTest
