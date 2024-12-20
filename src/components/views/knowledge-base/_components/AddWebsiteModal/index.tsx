import Modal from "@/components/organisms/Modal"
import { PopupKeys } from "@/utils/enums"
import React, { FC, useState } from "react"
import WebsiteModalForm from "./WebsiteModalForm"

const AddwebsiteModal: FC = () => {
  const [step, setStep] = useState()
  return (
    <Modal
      id={PopupKeys.WEBSITE_MODAL}
      classNames={{ root: "px-2", main: "w-full max-w-[600px] rounded-x20" }}
      header={{ title: "Add website" }}
    >
      <WebsiteModalForm />
    </Modal>
  )
}

export default AddwebsiteModal
