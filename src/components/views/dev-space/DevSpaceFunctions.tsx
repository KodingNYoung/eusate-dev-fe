"use client"

import { FC } from "@/utils/types"
import React, { useState } from "react"
import FunctionCard from "./_components/FunctionCard"
import { useDevSpaceFunctions } from "@/hooks/apiHooks/devSpaceHooks"
import DevSpaceEmptyState from "./_components/DevSpaceEmptyState"
import { DevspaceTabs } from "./utils"
import DSFunctionsDrawer from "./_components/DSFunctionsDrawer"
import { DevSpaceFunctionsResponse } from "@/lib/data/dev-space"
import { PopupKeys } from "@/utils/enums"
import { useModal } from "@/hooks/popupHooks"
import DeleteDSFunction from "./_components/DeleteDSFunction"

const DevSpaceFunctions: FC = () => {
  const { functions, isLoading, isFetching } = useDevSpaceFunctions()
  const { open } = useModal()

  const [func, setFunc] = useState<DevSpaceFunctionsResponse>()

  const openModal = (id: PopupKeys, func: DevSpaceFunctionsResponse) => {
    open(id)
    setFunc(func)
  }

  return (
    <>
      {isLoading && <>Loading...</>}
      {isFetching && !isLoading && <>Fetching...</>}
      {!functions?.length && !isFetching && (
        <DevSpaceEmptyState tab={DevspaceTabs.FUNCTIONS} />
      )}
      {!!functions?.length && (
        <div className="grid grid-cols-[repeat(auto-fit,_minmax(300px,_415px))] gap-5">
          {functions.map((func) => (
            <FunctionCard
              func={func}
              key={func.id}
              onEdit={() => openModal(PopupKeys.EDIT_FUNCTION_MODAL, func)}
              onDelete={() => openModal(PopupKeys.DELETE_FUNCTION_MODAL, func)}
            />
          ))}
        </div>
      )}
      <DSFunctionsDrawer />
      <DSFunctionsDrawer id={PopupKeys.EDIT_FUNCTION_MODAL} func={func} />
      <DeleteDSFunction funcId={func?.id || ""} />
    </>
  )
}

export default DevSpaceFunctions
