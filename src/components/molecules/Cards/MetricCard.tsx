import Icon from "@/components/atoms/Icon"
import Typography from "@/components/atoms/Typography"
import { FC } from "@/utils/types"
import React from "react"

const MetricCard: FC = () => {
  return (
    <div className="border border-[#e6e6e6] py-1.5 grid gap-2.5 rounded-x10">
      <div className="py-4 px-6 flex flex-col gap-2.5">
        <Typography as="h3" className="uppercase text-gray-400 text-regular-xs">
          TICKET VOLUME
        </Typography>
        <p>
          <Typography as="span" className="text-bold-2xl text-black">
            2,426
          </Typography>{" "}
          <Typography as="small" className="text-medium-sm text-gray-400">
            min
          </Typography>
        </p>
        <Typography as="p" className="text-medium-xs text-gray-300">
          <span className="text-success-400">+ 36%</span>{" "}
          <span>vs lastweek</span>
        </Typography>
      </div>
      <footer className="border-t border-[#e6e6e6] pt-2 pb-1 flex items-center justify-center">
        <button className="flex items-center justify-center gap-1">
          <Icon name="icon-trend-up" size={16} className="text-gradient" />
          <Typography as="span" className="text-medium-xs text-gradient">
            AI trend analysis
          </Typography>
        </button>
      </footer>
    </div>
  )
}

export default MetricCard
