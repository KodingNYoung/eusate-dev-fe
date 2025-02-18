import { FC } from "@/utils/types"
import React from "react"
import LogoAnimation from "./LogoAnimation"
import Typography from "@/components/atoms/Typography"
import Prompts from "./Prompts"

const EmptyState: FC = () => {
  return (
    <div className="flex flex-col gap-16">
      <div className="flex flex-col gap-8">
        <LogoAnimation />
        <div className="flex flex-col gap-2">
          <Typography className="text-bold-xl sm:text-bold-base text-gray-200">
            Hello there,
          </Typography>
          <Typography className="text-bold-3xl sm:text-bold-5xl text-gray-900">
            Let Your <span className="text-gradient">Data Support</span>
          </Typography>
        </div>
      </div>
      <Prompts />
    </div>
  )
}

export default EmptyState
