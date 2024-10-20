import Typography from "@/components/atoms/Typography"
import Radio from "@/components/molecules/Radio"
import { FC } from "@/utils/types"
import React from "react"

const Radios: FC = () => {
  return (
    <div className="grid gap-5">
      <Typography variant="semibold-3xl">Radio buttons</Typography>
      <div className="flex items-center gap-3 flex-wrap">
        <Radio
          id="radio1"
          name="radios"
          value="radio1"
          classNames={{ root: "w-52" }}
        >
          Radio 1
        </Radio>
        <Radio
          id="radio2"
          name="radios"
          value="radio2"
          classNames={{ root: "w-52" }}
        >
          Radio 2
        </Radio>
        <Radio id="radio3" value="radio3" name="radios" />
        <Radio id="radio4" value="radio4" name="radios" />
      </div>
    </div>
  )
}

export default Radios
