import AppModal from "@/components/organisms/Modal"
import { PopupKeys } from "@/utils/enums"
import { FC } from "@/utils/types"
import React from "react"
import GenerateAPIKeyForm from "./GenerateAPIKeyForm"

const GenerateAPIKeyModal: FC = () => {
  return (
    <AppModal
      id={PopupKeys.GENERATE_API_KEY}
      classNames={{ wrapper: "px-2", base: "w-full max-w-[600px] rounded-x20" }}
      header={{
        title: "Generate API key",
        subtitle: "Begin the process of creating your API keys.",
      }}
    >
      <GenerateAPIKeyForm />
    </AppModal>
  )
}

export default GenerateAPIKeyModal
