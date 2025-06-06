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
  const { avatar, name, email, industry, size, members } = getInfo()
  return (
    <section className="flex flex-col w-full border rounded-x20 border-gray-100 p-8 gap-y-16">
      <header>
        <EditInfo />
        <UserAvatar
          src={avatar}
          fullname={name}
          email={email}
          editAction={() => open(PopupKeys.EDIT_ORGANIZATION_INFO)}
          editLabel="Edit details"
        />
      </header>
      <main className="flex justify-between w-full md:w-[40%]">
        <div className="space-y-4 w-full">
          <Typography variant="regular-base" className="text-gray-400">
            Company name
          </Typography>
          <Typography variant="regular-base" className="text-gray-400">
            Industry
          </Typography>
          <Typography variant="regular-base" className="text-gray-400">
            Size
          </Typography>
          <Typography variant="regular-base" className="text-gray-400">
            Members
          </Typography>
        </div>
        <div className="space-y-4 w-full">
          <Typography variant="semibold-base" className="text-gray-900">
            {name}
          </Typography>
          <Typography variant="semibold-base" className="text-gray-900">
            {industry}
          </Typography>
          <Typography variant="semibold-base" className="text-gray-900">
            {size}
          </Typography>
          <Typography variant="semibold-base" className="text-gray-900">
            {members}
          </Typography>
        </div>
      </main>
    </section>
  )
}

export default Info
