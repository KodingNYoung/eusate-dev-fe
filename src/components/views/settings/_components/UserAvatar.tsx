import { FC } from "react"
import Icon from "@/components/atoms/Icon"
import Avatar from "@/components/atoms/Avatar"
import Button from "@/components/molecules/Buttons"
import Typography from "@/components/atoms/Typography"

type Props = {
  email: string
  fullname: string
  editLabel?: string
  src?: string
  editAction: () => void
  loading?: boolean
}

const UserAvatar: FC<Props> = ({
  src,
  fullname,
  email,
  editLabel,
  editAction,
  loading,
}) => {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center w-full">
        <Avatar
          className="w-20 h-20"
          src={src}
          name={fullname}
          loading={loading}
        />
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
        <Typography
          variant="semibold-base"
          className="text-gray-900"
          loading={loading}
        >
          {fullname}
        </Typography>
        <Typography
          variant="regular-sm"
          className="text-gray-500"
          loading={loading}
        >
          {email}
        </Typography>
      </div>
    </div>
  )
}

export default UserAvatar
