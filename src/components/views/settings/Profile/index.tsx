"use client"

import EditProfileModal from "./_components/EditProfileModal"
import { PopupKeys } from "@/utils/enums"
import { useModal } from "@/hooks/popupHooks"
import UserAvatar from "../_components/UserAvatar"
import Typography from "@/components/atoms/Typography"
import { useUserProfile } from "@/hooks/api/settingsHooks"
import userAvatar from "@/assets/images/user-avatar.svg"

const Profile = () => {
  const { open } = useModal()

  const { data, isLoading } = useUserProfile()

  // TODO: handle loading with skeleton

  return (
    <>
      <section className="flex flex-col w-full border rounded-x20 border-gray-100 p-8 gap-y-16">
        <header>
          <UserAvatar
            src={data?.profile_picture || userAvatar}
            email={data?.email || ""}
            fullname={data?.username || ""}
            editAction={() => open(PopupKeys.EDIT_PROFILE)}
            loading={isLoading}
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
                loading={isLoading}
              >
                {data?.username}
              </Typography>
            </div>
            <div className="grid grid-cols-[1fr_200px] w-full">
              <Typography variant="regular-base" className="text-gray-400">
                Role
              </Typography>
              <Typography
                variant="semibold-base"
                className="text-gray-900"
                loading={isLoading}
              >
                {data?.meta.role}
              </Typography>
            </div>
            <div className="grid grid-cols-[1fr_200px] w-full">
              <Typography variant="regular-base" className="text-gray-400">
                Email
              </Typography>
              <Typography
                variant="semibold-base"
                className="text-gray-900"
                loading={isLoading}
              >
                {data?.email}
              </Typography>
            </div>
          </div>
        </main>
      </section>
      {data && <EditProfileModal profileData={data} />}
    </>
  )
}

export default Profile
