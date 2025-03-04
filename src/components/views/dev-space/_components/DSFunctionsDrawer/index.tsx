import { DevSpaceFunctionsResponse } from "@/lib/data/dev-space"
import { PopupKeys } from "@/utils/enums"
import { FC } from "@/utils/types"
import React from "react"
import FunctionFormSections from "./FunctionFormSections"
import AppDrawer from "@/components/organisms/AppDrawer"

type Props = {
  func?: DevSpaceFunctionsResponse
  id?: PopupKeys
}

const DSFunctionsDrawer: FC<Props> = ({
  func = {} as DevSpaceFunctionsResponse,
  id = PopupKeys.ADD_FUNCTION_MODAL,
}) => {
  const isAdd = id === PopupKeys.ADD_FUNCTION_MODAL
  return (
    <AppDrawer
      id={id}
      header={{ title: isAdd ? "Create a function" : "Update function" }}
      classNames={{ wrapper: "px-2", base: "w-full max-w-[504px]" }}
    >
      <FunctionFormSections isAdd={isAdd} func={func} />
    </AppDrawer>
  )
}

export default DSFunctionsDrawer
