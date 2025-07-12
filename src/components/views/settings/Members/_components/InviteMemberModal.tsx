import { PopupKeys } from "@/utils/enums"
import AppModal from "@/components/organisms/Modal"
import InviteMemberForm from "./InviteMemberForm"
import { FC, OrganisationUser } from "@/utils/types"

type Props = {
  member?: OrganisationUser
  modalId?: PopupKeys
}

const InviteMemberModal: FC<Props> = ({
  member = {} as OrganisationUser,
  modalId = PopupKeys.INVITE_MEMBER_MODAL,
}) => {
  const isInvite = modalId === PopupKeys.INVITE_MEMBER_MODAL

  return (
    <AppModal
      size="lg"
      id={modalId}
      header={{ title: isInvite ? "Invite new member" : "Manage user access" }}
      headerStyle={{ title: "text-regular-lg" }}
    >
      <InviteMemberForm member={member} isInvite={isInvite} />
    </AppModal>
  )
}

export default InviteMemberModal
