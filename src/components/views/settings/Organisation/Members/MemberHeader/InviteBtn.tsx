import { PopupKeys } from "@/utils/enums"
import Icon from "@/components/atoms/Icon"
import { useModal } from "@/hooks/popupHooks"
import Button from "@/components/molecules/Buttons"

const Invite = () => {
  const { open } = useModal()
  return (
    <Button
      size="sm"
      className="px-4 py-3"
      onClick={() => open(PopupKeys.INVITE_MEMBER)}
      startContent={<Icon size={20} name="icon-plus" />}
    >
      Invite new member
    </Button>
  )
}

export default Invite
