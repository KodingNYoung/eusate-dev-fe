import { Member } from "../utils"
import DisplayDate from "./DisplayDate"
import Icon from "@/components/atoms/Icon"
import Userinfo from "@/components/molecules/Userinfo"
import Typography from "@/components/atoms/Typography"

const Cell = (member: Member, columnKey: unknown) => {
  const key = columnKey as keyof Member
  const cellValue = member[key]
  switch (key as keyof Member & "action") {
    case "name":
      return (
        <Userinfo
          src={member.avatar}
          classNames={{ title: "!text-gray-500" }}
          title={cellValue as string}
        />
      )
    case "email":
      return (
        <Typography variant="regular-sm" className="text-gray-500">
          {cellValue}
        </Typography>
      )
    case "last_seen":
      return <DisplayDate timestamp={cellValue as string} />
    case "date_added":
      return <DisplayDate timestamp={cellValue as string} />
    case "action":
      return (
        <Icon
          size={20}
          name="icon-more"
          className="text-gray-500 cursor-pointer"
        />
      )
    default:
      return cellValue
  }
}

export default Cell
