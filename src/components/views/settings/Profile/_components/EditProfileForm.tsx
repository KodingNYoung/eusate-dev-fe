import Avatar from "@/components/atoms/Avatar"
import { FC, UserProfileType } from "@/utils/types"
import React, { useEffect, useState } from "react"
import userAvatar from "@/assets/images/user-avatar.svg"
import Button from "@/components/molecules/Buttons"
import Input from "@/components/molecules/Inputs"
import SubmitButton from "@/components/molecules/Buttons/SubmitButton"
import { useModal } from "@/hooks/popupHooks"
import { useFormState } from "react-dom"
import { updateProfile } from "@/app/(organisation-routes)/(dashboard)/settings/actions"
import UploadButton from "@/components/molecules/Inputs/UploadButton"
import { useFormToast } from "@/hooks/formHooks"
import { useQueryClient } from "@tanstack/react-query"
import { QUERY_FN_KEYS } from "@/utils/constants"
import { usePhotoUpload } from "@/hooks/utilityHooks"

type Props = {
  profileData: UserProfileType
}

type ProfileType = {
  profile_picture: string
  username: string
}

const EditProfileForm: FC<Props> = ({ profileData }) => {
  const { close } = useModal()
  const queryClient = useQueryClient()

  const [profile, setProfile] = useState<ProfileType>({
    username: "",
    profile_picture: "",
  })

  const { isUploading, onPhotoChange } = usePhotoUpload((url) =>
    setProfile((curr) => ({ ...curr, profile_picture: url }))
  )
  const [state, action] = useFormState(updateProfile, {})

  useFormToast(state, true)

  const removeProfile = () => {
    setProfile((curr) => ({ ...curr, profile_picture: "" }))
  }

  useEffect(() => {
    if (profileData)
      setProfile({
        profile_picture: profileData.profile_picture,
        username: profileData.username,
      })
  }, [profileData])
  useEffect(() => {
    if ("success" in state) {
      queryClient.invalidateQueries({ queryKey: QUERY_FN_KEYS.USER_PROFILE })
      close()
    }
  }, [state, queryClient, close])

  return (
    <form action={action}>
      <main className="px-8 py-5 grid gap-5 border-b border-b-gray-50">
        <div className="flex items-center gap-6">
          <Avatar
            className="w-20 h-20"
            src={profile?.profile_picture || userAvatar}
          />
          <input
            hidden
            readOnly
            value={profile?.profile_picture}
            name="profile_picture"
          />
          <div className="flex items-center gap-4">
            <UploadButton
              id="profile-picture-upload-btn"
              onChange={onPhotoChange}
              buttonProps={{ loading: isUploading }}
            >
              Upload new
            </UploadButton>
            <Button
              size="sm"
              variant="tetiary"
              className="px-3 py-2"
              onClick={removeProfile}
              disabled={isUploading}
            >
              Remove photo
            </Button>
          </div>
        </div>
        <Input
          value={profile?.username || ""}
          name="username"
          label="Enter Full Name"
          placeholder="Full Name"
          classNames={{
            label: "text-semibold-sm text-gray-700 mb-3",
          }}
          onChange={(e) => {
            setProfile((curr) => ({
              ...curr,
              username: (e.target as HTMLInputElement).value,
            }))
          }}
        />
      </main>

      <footer className="grid grid-cols-2 gap-5 py-5 px-8">
        <Button
          size="xl"
          variant="tetiary"
          className="py-5 w-full"
          onClick={() =>
            setProfile({
              profile_picture: profileData.profile_picture,
              username: profileData.username,
            })
          }
          disabled={isUploading}
        >
          Discard changes
        </Button>
        <SubmitButton size="xl" className="py-5 w-full" disabled={isUploading}>
          Save changes
        </SubmitButton>
      </footer>
    </form>
  )
}

export default EditProfileForm
