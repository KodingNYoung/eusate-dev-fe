import Icon from "@/components/atoms/Icon"
import Input, { InputProps } from "@/components/molecules/Inputs"
import { useDebounceCallback } from "@/hooks/utilityHooks"
import { cls } from "@/utils/helpers"
import { FC } from "@/utils/types"
import React, { useEffect, useRef, useState } from "react"

type Props = Omit<InputProps, "name"> & {
  onSearch: (value: string) => void
  value?: string
}

const SearchInput: FC<Props> = ({ value, onSearch, classNames, ...props }) => {
  const handleSearch = useDebounceCallback(onSearch, 500)
  const [search, setSearch] = useState(value)

  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Check for Cmd+K (Mac) or Ctrl+K (Windows/Linux)
      if ((event.metaKey || event.ctrlKey) && event.key === "k") {
        event.preventDefault() // Prevent default browser behavior
        inputRef.current?.focus()
      }
    }

    // Add event listener to document
    document.addEventListener("keydown", handleKeyDown)

    // Cleanup
    return () => {
      document.removeEventListener("keydown", handleKeyDown)
    }
  }, [])

  return (
    <Input
      ref={inputRef}
      name="search"
      size="sm"
      placeholder="Search"
      classNames={{
        ...classNames,
        inputContainer: cls(
          "before:[--inputColor1:_#D0D3D9] before:[--inputColor2:_#D0D3D9]",
          classNames?.inputContainer
        ),
        input: cls("placeholder:text-gray-200", classNames?.input),
      }}
      startComponent={
        <Icon
          name="icon-search-normal"
          className={cls(
            "text-gray-300 text-regular-xl",
            classNames?.startContent
          )}
        />
      }
      {...props}
      onChange={(e) => {
        setSearch(e.currentTarget.value)
        handleSearch(e.currentTarget.value)
      }}
      value={search}
    />
  )
}

export default SearchInput
