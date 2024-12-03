import Icon from "@/components/atoms/Icon"
import Input from "@/components/molecules/Inputs"
import { FC } from "@/utils/types"
import React from "react"

const SearchInput: FC = () => {
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
        onChange={(e) => console.log(e.currentTarget.value)}
      />
    </>
  )
}

export default SearchInput
