import Typography from "@/components/atoms/Typography"
import { FC } from "@/utils/types"
import React from "react"

const HelpDeskLayout: FC = ({ children }) => {
  return (
    <div className="bg-white sm:rounded-x20 px-4 sm:px-5 py-3 sm:py-4.5 h-full flex flex-col gap-4 sm:gap-5 relative">
      <header>
        <div className="grid gap-2">
          <Typography className="text-bold-base sm:text-bold-2xl text-gray-900">
            Helpdesk
          </Typography>
          <Typography className="text-regular-xs sm:text-regular-sm text-black-50">
            Empower your AI with curated knowledge.
          </Typography>
        </div>
      </header>
      {children}
    </div>
  )
}

export default HelpDeskLayout
