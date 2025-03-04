import { IconNames } from "@/utils/iconNames"
import { FC } from "@/utils/types"
import React, { ReactNode } from "react"
import Icon from "../atoms/Icon"
import Typography from "../atoms/Typography"

type Props = {
  icon: IconNames
  title: string
  subtitle: ReactNode
  actions?: ReactNode
}

const Banner: FC<Props> = ({ icon, title, subtitle, actions }) => {
  return (
    <section className="border border-gray-50 bg-gray-25 rounded-xl sm:rounded-x20 p-3 sm:p-8 flex flex-col sm:flex-row sm:justify-between gap-4">
      <header className="flex sm:flex-col gap-4">
        <div className="size-8 sm:size-10 border border-black-10 rounded-full flex items-center justify-center">
          <Icon
            name={icon}
            className="text-regular-lg sm:text-regular-xl text-gray-500"
          />
        </div>
        <div className="grid gap-2">
          <Typography className="text-bold-base sm:text-bold-2xl text-gray-900">
            {title}
          </Typography>
          <Typography className="text-regular-xs sm:text-regular-sm text-black-50">
            {subtitle}
          </Typography>
        </div>
      </header>
      <div>{actions}</div>
    </section>
  )
}

export default Banner
