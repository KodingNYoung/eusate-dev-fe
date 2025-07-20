"use client"

import { FC, KnowledgeSource } from "@/utils/types"
import React, { useState } from "react"
import FAQCard from "./FAQCard"
import { PopupKeys } from "@/utils/enums"
import FAQModal from "./FAQModal"
import { useModal } from "@/hooks/popupHooks"
import DeleteSourceModal from "../../knowledge-base/_components/DeleteSourceModal"

type Props = {
  faqs: KnowledgeSource[]
  loading?: boolean
}

const FAQCardsList: FC<Props> = ({ faqs }) => {
  const { open } = useModal()
  const [faq, setFaq] = useState<KnowledgeSource>()

  const openModal = (id: PopupKeys, faq: KnowledgeSource) => {
    open(id)
    setFaq(faq)
  }

  return (
    <section className="flex-1">
      <div className="grid gap-5 grid-cols-[repeat(auto-fill,_minmax(320px,_1fr))]">
        {faqs.map((faq) => {
          return (
            <FAQCard
              key={faq.id}
              faq={faq}
              onEdit={() => openModal(PopupKeys.EDIT_FAQS_MODAL, faq)}
              onDelete={() => openModal(PopupKeys.DELETE_SOURCE_MODAL, faq)}
            />
          )
        })}
        <FAQModal id={PopupKeys.EDIT_FAQS_MODAL} faq={faq} />
        <DeleteSourceModal source={faq as KnowledgeSource} />
      </div>
    </section>
  )
}

export default FAQCardsList
