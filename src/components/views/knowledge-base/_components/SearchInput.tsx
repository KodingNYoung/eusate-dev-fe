import Icon from "@/components/atoms/Icon"
import Input from "@/components/molecules/Inputs"
import { useDebounceCallback } from "@/hooks/utilityHooks"
import { FC } from "@/utils/types"
import React, { useState } from "react"

type Props = {
  onSearch: (value: string) => void
  value?: string
}

const SearchInput: FC<Props> = ({ value, onSearch }) => {
  const handleSearch = useDebounceCallback(onSearch, 500)
  const [search, setSearch] = useState(value)

  return (
    <>
      <Input
        name="search"
        size="sm"
        placeholder="Search"
        classNames={{
          inputContainer:
            "before:[--inputColor1:_#D0D3D9] before:[--inputColor2:_#D0D3D9]",
          input: "placeholder:text-gray-200",
        }}
        startComponent={
          <Icon
            name="icon-search-normal"
            className="text-gray-300 text-regular-xl"
          />
        }
        onChange={(e) => {
          setSearch(e.currentTarget.value)
          handleSearch(e.currentTarget.value)
        }}
        value={search}
      />
    </>
  )
}

export default SearchInput
