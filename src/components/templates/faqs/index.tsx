import Icon from "@/components/atoms/Icon"
import OpenModalButton from "@/components/molecules/Buttons/OpenModalButton"
import Banner from "@/components/organisms/Banner"
import { PopupKeys } from "@/utils/enums"
import { FC } from "@/utils/types"
import React from "react"

const FAQsLayout: FC = ({ children }) => {
  return (
    <div className="bg-white sm:rounded-x20 px-4 sm:px-5 py-3 sm:py-4.5 h-full flex flex-col gap-4 sm:gap-5">
      <Banner
        icon="icon-message-question"
        title="Frequently Asked Questions"
        subtitle="Empower your AI with curated knowledge."
        actions={
          <OpenModalButton
            startContent={
              <Icon
                name="icon-plus"
                className="text-regular-base sm:text-regular-xl"
              />
            }
            classNames={{
              root: "ml-12 sm:ml-0 py-1 sm:py-2.5 px-3 sm-gradient",
              label: "text-medium-xs sm:text-medium-sm ",
            }}
            modalKey={PopupKeys.FAQS_MODAL}
          >
            Add FAQ
          </OpenModalButton>
        }
      />
      {children}
    </div>
  )
}

export default FAQsLayout
