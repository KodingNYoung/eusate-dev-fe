import React, { FC } from "react"
import Typography from "@/components/atoms/Typography"
import LogoAnimation from "../../playground/_components/LogoAnimation"
import { useUserProfile } from "@/hooks/api/settingsHooks"

const NoCurrentChat: FC = () => {
  const { data } = useUserProfile()
  return (
    <div className="flex flex-col justify-center items-center">
      <LogoAnimation />
      <div>
        <Typography className="text-bold-base text-center font-[700] text-gray-200">
          Hi {data?.username} 👋
        </Typography>
        <Typography className="text-bold-2xl text-center font-[700] text-gray-900">
          Let Your <span className="text-gradient">Data Support</span>
        </Typography>
      </div>
    </div>
  )
}

export default NoCurrentChat
