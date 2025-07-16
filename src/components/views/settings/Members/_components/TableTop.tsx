import { FC } from "@/utils/types"
import { useQueryParams } from "@/hooks/utilityHooks"
import SearchInput from "@/components/molecules/Inputs/SearchInput"
import { ORGANISATION_QUERY_KEYS } from "../../utils"
import SortDropdown from "@/components/molecules/Popups/SortDropdown"
import { SORT_BY_OPTIONS } from "../utils"
import { useMemo } from "react"
import { PopupKeys, SortOrder } from "@/utils/enums"
import Button from "@/components/molecules/Buttons"
import { useModal } from "@/hooks/popupHooks"
import Icon from "@/components/atoms/Icon"

const Header: FC = () => {
  const { get, set, searchParams } = useQueryParams()
  const { open } = useModal()

  const { search, sortby } = useMemo(
    () => ({
      search: get(ORGANISATION_QUERY_KEYS.SEARCH) || "",
      sortby: (
        get(ORGANISATION_QUERY_KEYS.SORT_BY) ||
        `${SORT_BY_OPTIONS[0].value} ${SortOrder.ASCEND}`
      ).split(" "),
    }),
    [searchParams]
  )

  return (
    <header className="w-full flex items-center justify-between p-2">
      <div className="flex items-center gap-2.5">
        <SearchInput
          value={search}
          onSearch={(value) =>
            set(ORGANISATION_QUERY_KEYS.SEARCH, value || null)
          }
        />
        <SortDropdown
          onSort={(value) => {
            set(ORGANISATION_QUERY_KEYS.SORT_BY, value)
          }}
          options={SORT_BY_OPTIONS}
          order={sortby[1]}
          value={sortby[0]}
        />
      </div>
      <Button
        size="sm"
        className="px-4 h-[40px] text-medium-sm"
        onClick={() => open(PopupKeys.INVITE_MEMBER_MODAL)}
        startContent={<Icon size={20} name="icon-plus" />}
      >
        Invite new member
      </Button>
    </header>
  )
}
export default Header
