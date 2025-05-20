import React, { FC } from "react"
import Image from "next/image"
import eusateGlowLogo from "@/assets/images/playground-icon.svg"
import Typography from "@/components/atoms/Typography"

type Props = {
  supportTeamName: string
}

const NoCurrentChat: FC<Props> = ({ supportTeamName }) => {
  return (
    <div className="flex flex-col justify-center items-center">
      <Image
        alt="eusate-glow-logo"
        src={eusateGlowLogo}
        className="!size-45 w-25 h-25 !min-w-25 !min-h-45"
      />
      <div>
        <Typography className="text-bold-base text-center font-[700] text-gray-200">
          Hi {supportTeamName}👋
        </Typography>
        <Typography className="text-bold-2xl text-center font-[700] text-gray-900">
          Let Your <span className="text-gradient">Data Support</span>
        </Typography>
      </div>
    </div>
  )
}

export default NoCurrentChat
