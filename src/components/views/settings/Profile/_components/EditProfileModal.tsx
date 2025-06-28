import { PopupKeys } from "@/utils/enums"
import AppModal from "@/components/organisms/Modal"
import { FC, UserProfileType } from "@/utils/types"
import EditProfileForm from "./EditProfileForm"

type Props = {
  profileData: UserProfileType
}

const EditProfileModal: FC<Props> = ({ profileData }) => {
  return (
    <AppModal
      size="xl"
      id={PopupKeys.EDIT_PROFILE}
      header={{ title: "Edit Profile" }}
      headerStyle={{ title: "text-regular-lg px-3 py-2" }}
    >
      <EditProfileForm profileData={profileData} />
    </AppModal>
  )
}

export default EditProfileModal
