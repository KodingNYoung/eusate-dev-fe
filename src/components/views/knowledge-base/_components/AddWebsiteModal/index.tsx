import Modal from "@/components/organisms/Modal"
import { PopupKeys } from "@/utils/enums"
import React, { FC } from "react"
import WebsiteModalForm from "./WebsiteModalForm"

const AddwebsiteModal: FC = () => {
  return (
    <Modal
      id={PopupKeys.WEBSITE_MODAL}
      classNames={{ wrapper: "px-2", base: "w-full max-w-[600px] rounded-x20" }}
      header={{ title: "Add website" }}
    >
      <WebsiteModalForm />
    </Modal>
  )
}

export default AddwebsiteModal
