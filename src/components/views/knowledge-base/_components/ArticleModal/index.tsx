import Modal from "@/components/organisms/Modal"
import { PopupKeys } from "@/utils/enums"
import { FC } from "@/utils/types"
import React, { useState } from "react"
import SelectMethod from "./SelectMethod"
import AddArticleLink from "./AddArticleLink"
import ToastContextProvider from "@/providers/toastProviders"

const ArticleModal: FC = () => {
  const [step, setStep] = useState<0 | 1>(0)

  const onOptionSelect = () => setStep(1)
  return (
    <Modal
      id={PopupKeys.ARTICLE_MODAL}
      classNames={{ wrapper: "px-2", base: "w-full max-w-[600px] rounded-x20" }}
      header={{ title: step ? "Import using links" : "Add an article" }}
    >
      <ToastContextProvider>
        {step === 0 ? (
          <SelectMethod onOptionSelect={onOptionSelect} />
        ) : (
          <AddArticleLink />
        )}
      </ToastContextProvider>
    </Modal>
  )
}

export default ArticleModal
