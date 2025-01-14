"use client"

import { FC, KnowledgeSource } from "@/utils/types"
import React, { useState } from "react"
import FAQCard from "./FAQCard"
import { PopupKeys } from "@/utils/enums"
import FAQModal from "./FAQModal"
import { useModal } from "@/hooks/popupHooks"
import DeleteFAQModal from "./DeleteFAQModal"

type Props = {
  faqs: KnowledgeSource[]
}

const FAQCardsList: FC<Props> = ({ faqs }) => {
  const { open } = useModal()
  const [faq, setFaq] = useState<KnowledgeSource>()

  const openModal = (id: PopupKeys, faq: KnowledgeSource) => {
    open(id)
    setFaq(faq)
  }

  return (
    <section className="grid gap-5 grid-cols-[repeat(auto-fit,_minmax(380px,_1fr))]">
      {faqs.map((faq) => {
        return (
          <FAQCard
            key={faq.id}
            faq={faq}
            onEdit={() => openModal(PopupKeys.EDIT_FAQS_MODAL, faq)}
            onDelete={() => openModal(PopupKeys.DELETE_FAQS_MODAL, faq)}
          />
        )
      })}
      <FAQModal id={PopupKeys.EDIT_FAQS_MODAL} faq={faq} />
      <DeleteFAQModal faq={faq as KnowledgeSource} />
    </section>
  )
}

export default FAQCardsList
