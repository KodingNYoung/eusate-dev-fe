import { PopupKeys } from "@/utils/enums"
import InviteNewMember from "./InviteNewMember"
import CompletedModal from "../../../_components/Completed"

const MemberModals = () => {
  return (
    <div>
      <InviteNewMember />
      <CompletedModal
        id={PopupKeys.COMPLETED_INVITE_MEMBER}
        header="Invite sent"
        btnLabel="Okay, got it"
        description="An invitation has been sent to the new member! 'll be notified as soon as they join."
      />
    </div>
  )
}

export default MemberModals
