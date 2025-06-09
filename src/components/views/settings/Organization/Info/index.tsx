"use client"

import EditInfo from "./EditInfo"
import { PopupKeys } from "@/utils/enums"
import { useModal } from "@/hooks/popupHooks"
import UserAvatar from "../../_components/UserAvatar"
import Typography from "@/components/atoms/Typography"
import { useSettings } from "@/providers/settingsProvider"

const Info = () => {
  const { open } = useModal()
  const { getInfo } = useSettings()
  const { avatar, name, email, industry, size, members } = getInfo
  return (
    <section className="flex flex-col w-full border rounded-x20 border-gray-100 p-8 gap-y-16">
      <header>
        <EditInfo />
        <UserAvatar
          src={avatar}
          fullname={name}
          email={email}
          editLabel="Edit details"
          editAction={() => open(PopupKeys.EDIT_ORGANIZATION_INFO)}
        />
      </header>

      <main className="flex justify-between w-full md:w-[40%]">
        <div className="grid gap-y-4 w-full">
          <div className="grid grid-cols-[1fr_200px] w-full">
            <Typography variant="regular-base" className="text-gray-400">
              Company name
            </Typography>
            <Typography
              variant="semibold-base"
              className="text-gray-900 text-left"
            >
              {name}
            </Typography>
          </div>
          <div className="grid grid-cols-[1fr_200px] w-full">
            <Typography variant="regular-base" className="text-gray-400">
              Industry
            </Typography>
            <Typography variant="semibold-base" className="text-gray-900">
              {industry}
            </Typography>
          </div>
          <div className="grid grid-cols-[1fr_200px] w-full">
            <Typography variant="regular-base" className="text-gray-400">
              Size
            </Typography>
            <Typography variant="semibold-base" className="text-gray-900">
              {size}
            </Typography>
          </div>
          <div className="grid grid-cols-[1fr_200px] w-full">
            <Typography variant="regular-base" className="text-gray-400">
              Members
            </Typography>
            <Typography variant="semibold-base" className="text-gray-900">
              {members}
            </Typography>
          </div>
        </div>
      </main>
    </section>
  )
}

export default Info
