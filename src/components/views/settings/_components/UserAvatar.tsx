import Avatar from "@/components/atoms/Avatar"
import Typography from "@/components/atoms/Typography"
import userAvatar from "@/assets/images/user-avatar.svg"
import { FC } from "react"
import Icon from "@/components/atoms/Icon"
import Button from "@/components/molecules/Buttons"

type Props = {
  email: string
  fullname: string
  editLabel?: string
  src?: string | null
  editAction: () => void
}

const UserAvatar: FC<Props> = ({
  src,
  fullname,
  email,
  editLabel,
  editAction,
}) => {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center w-full">
        <Avatar className="w-20 h-20" src={src || userAvatar} />
        <Button
          variant="tetiary"
          onClick={editAction}
          startContent={
            <Icon size={18} className="text-semibold-sm" name="icon-edit-2" />
          }
          classNames={{ root: "px-3 py-2", label: "text-semibold-sm" }}
        >
          {editLabel || "Edit profile"}
        </Button>
      </div>
      <div className="space-y-2">
        <Typography variant="semibold-base" className="text-gray-900">
          {fullname}
        </Typography>
        <Typography variant="regular-sm" className="text-gray-500">
          {email}
        </Typography>
      </div>
    </div>
  )
}

export default UserAvatar
