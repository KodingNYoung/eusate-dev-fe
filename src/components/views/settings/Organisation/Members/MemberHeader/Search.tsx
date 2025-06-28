import { FC } from "@/utils/types"
import Icon from "@/components/atoms/Icon"
import { MEMBER_QUERY_KEYS } from "../utils"
import { ChangeEvent, useCallback } from "react"
import Input from "@/components/molecules/Inputs"
import { useQueryParams } from "@/hooks/utilityHooks"

type Props = {
  searchQuery: string | null
  setPage: React.Dispatch<React.SetStateAction<number>>
  setSearchQuery: React.Dispatch<React.SetStateAction<string | null>>
}

const SearchQuery: FC<Props> = ({ searchQuery, setSearchQuery, setPage }) => {
  const { set } = useQueryParams()
  const onSearchChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target
    if (value) {
      setSearchQuery(value)
      setPage(1)
    } else setSearchQuery(null)
    setTimeout(() => set(MEMBER_QUERY_KEYS.QUERY, value), 1000) // delay for quick typing
  }, [])
  return (
    <Input
      size="md"
      name="search"
      value={searchQuery ?? ""}
      placeholder="Search"
      className="w-full min-w-96 h-[40px]"
      onChange={onSearchChange}
      startComponent={
        <Icon size={20} className="text-gray-200" name="icon-search-normal" />
      }
    />
  )
}

export default SearchQuery
