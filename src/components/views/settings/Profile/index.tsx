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
    profile: { avatar, fullname, email, role },
  } = useSettings()
  return (
    <section className="flex flex-col w-full border rounded-x20 border-gray-100 p-8 gap-y-16">
      <header>
        <EditProfile />
        <UserAvatar
          src={avatar}
          email={email}
          fullname={fullname}
          editAction={() => open(PopupKeys.EDIT_PROFILE)}
        />
      </header>
      <main className="flex justify-between w-full md:w-[40%]">
        <div className="grid gap-y-8 w-full">
          <div className="grid grid-cols-[1fr_200px] w-full">
            <Typography variant="regular-base" className="text-gray-400">
              Full name
            </Typography>
            <Typography
              variant="semibold-base"
              className="text-gray-900 text-left"
            >
              {fullname}
            </Typography>
          </div>
          <div className="grid grid-cols-[1fr_200px] w-full">
            <Typography variant="regular-base" className="text-gray-400">
              Role
            </Typography>
            <Typography variant="semibold-base" className="text-gray-900">
              {role}
            </Typography>
          </div>
          <div className="grid grid-cols-[1fr_200px] w-full">
            <Typography variant="regular-base" className="text-gray-400">
              Email
            </Typography>
            <Typography variant="semibold-base" className="text-gray-900">
              {email}
            </Typography>
          </div>
        </div>
      </main>
    </section>
  )
}

export default Profile
