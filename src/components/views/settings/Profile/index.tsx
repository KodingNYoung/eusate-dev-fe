"use client"

import EditProfile from "./EditProfile"
import { PopupKeys } from "@/utils/enums"
import { useModal } from "@/hooks/popupHooks"
import UserAvatar from "../_components/UserAvatar"
import Typography from "@/components/atoms/Typography"
import { useSettings } from "@/providers/settingsProvider"

const Profile = () => {
  const { open } = useModal()
  const {
    profile: { src, fullname, email, role },
  } = useSettings()
  return (
    <section className="flex flex-col w-full h-auto border rounded-x20 border-gray-100 p-8 gap-y-16">
      <header>
        <EditProfile />
        <UserAvatar
          src={src}
          fullname={fullname}
          email={email}
          editAction={() => open(PopupKeys.EDIT_PROFILE)}
        />
      </header>
      <main className="flex justify-between w-full md:w-[40%]">
        <div className="space-y-4 w-full">
          <Typography variant="regular-base" className="text-gray-400">
            Full name
          </Typography>
          <Typography variant="regular-base" className="text-gray-400">
            Role
          </Typography>
          <Typography variant="regular-base" className="text-gray-400">
            Email
          </Typography>
        </div>
        <div className="space-y-4 w-full">
          <Typography variant="semibold-base" className="text-gray-900">
            {fullname}
          </Typography>
          <Typography variant="semibold-base" className="text-gray-900">
            {role}
          </Typography>
          <Typography variant="semibold-base" className="text-gray-900">
            {email}
          </Typography>
        </div>
      </main>
    </section>
  )
}

export default Profile
