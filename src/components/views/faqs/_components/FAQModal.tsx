import Modal from "@/components/organisms/Modal"
import React from "react"
import FAQModalForm from "./FAQModalForm"
import { PopupKeys } from "@/utils/enums"
import ToastContextProvider from "@/providers/toastProviders"
import { FC, KnowledgeSource } from "@/utils/types"

type Props = {
  id?: PopupKeys
  faq?: KnowledgeSource
}

const FAQModal: FC<Props> = ({ id = PopupKeys.ADD_FAQS_MODAL, faq }) => {
  const isAdd = id === PopupKeys.ADD_FAQS_MODAL
  return (
    <ToastContextProvider>
      <Modal
        id={id}
        classNames={{ root: "px-2", main: "w-full max-w-[600px] rounded-x20" }}
        header={{ title: isAdd ? "Add FAQ" : "Edit FAQ" }}
      >
        <FAQModalForm isAdd={isAdd} faq={faq} />
      </Modal>
    </ToastContextProvider>
  )
}

export default FAQModal
