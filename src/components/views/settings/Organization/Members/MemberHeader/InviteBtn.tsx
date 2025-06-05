import Icon from "@/components/atoms/Icon"
import { useModal } from "@/hooks/popupHooks"
import Button from "@/components/molecules/Buttons"
import { PopupKeys } from "@/utils/enums"

const Invite = () => {
  const { open } = useModal()
  return (
    <Button
      onClick={() => open(PopupKeys.INVITE_MEMBER)}
      startContent={<Icon size={20} name="icon-plus" />}
      size="sm"
      className="px-4 py-3"
    >
      Invite new member
    </Button>
  )
}

export default Invite
