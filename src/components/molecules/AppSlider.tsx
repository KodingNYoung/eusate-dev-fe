import { FC } from "@/utils/types"
import { Slider, SliderProps } from "@nextui-org/react"
import React from "react"

type Props = SliderProps

const AppSlider: FC<Props> = ({ ...props }) => {
  return (
    <Slider
      classNames={{
        label: "text-[14px] font-semibold text-gray-700",
        base: "gap-4.5",
        filler: "bg-black",
        track: "text-gray-100 h-[5px] border-s-black",
      }}
      hideValue
      size="sm"
      showTooltip
      tooltipProps={{
        classNames: { base: "before:bg-black", content: "bg-black" },
      }}
      renderThumb={(props) => (
        <div
          {...props}
          className="size-6 bg-black rounded-full top-1/2 cursor-grab"
        />
      )}
      {...props}
    />
  )
}

export default AppSlider
