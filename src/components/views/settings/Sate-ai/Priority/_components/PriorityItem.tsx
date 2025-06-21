import { FC } from "@/utils/types"
import { cls } from "@/utils/helpers"
import Icon from "@/components/atoms/Icon"
import Badge from "@/components/atoms/Badge"
import Button from "@/components/molecules/Buttons"
import Typography from "@/components/atoms/Typography"
import { PRIORITY_COLOR_MAP, PriorityLevelType } from "../../utils"

type Props = {
  area: string
  level: PriorityLevelType
  onEditPriority: () => void
  onDeletePriority: () => void
}

const PriorityItem: FC<Props> = ({
  area,
  level,
  onEditPriority,
  onDeletePriority,
}) => {
  return (
    <div className={cls("w-full flex justify-between items-center")}>
      <Typography
        variant="regular-sm"
        className="text-gray-900 border p-4 w-1/2 border-1 border-gray-50 rounded-full"
      >
        {area}
      </Typography>
      <Badge
        type="filled"
        color={PRIORITY_COLOR_MAP[level.toLowerCase() as PriorityLevelType]}
      >
        {level}
      </Badge>
      <div className="flex gap-4">
        <Button
          variant="tetiary"
          onClick={onEditPriority}
          className="flex rounded-full p-2"
          classNames={{ label: "leading-none" }}
        >
          <Icon size={20} name="icon-edit-2" className="text-gray-500" />
        </Button>
        <Button
          variant="tetiary"
          onClick={onDeletePriority}
          classNames={{ label: "leading-none" }}
          className="rounded-full p-2 !hover:bg-gray-900"
        >
          <Icon size={20} name="icon-trash" className="text-gray-500" />
        </Button>
      </div>
    </div>
  )
}

export default PriorityItem
