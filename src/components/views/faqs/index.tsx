"use client"

import React, { useMemo } from "react"
import FAQModal from "./_components/FAQModal"
import { FC } from "@/utils/types"
import FAQCardsList from "./_components/FAQCardsList"
import AppPagination from "@/components/organisms/AppPagination"
import { useQueryParams } from "@/hooks/utilityHooks"
import EmptyState from "@/components/organisms/EmptyState"
import faqEmptyState from "@/assets/images/faq-empty-state.svg"
import { KnowledgeSourceTags, PopupKeys } from "@/utils/enums"
import { useKnowledgeBaseResources } from "@/hooks/api/knowledgeBaseHooks"

type Props = {
  page: number
}
const QUERY_KEYS = {
  PAGE: "page",
} as const

const PAGE_SIZE = 8

const FAQs: FC<Props> = ({ page }) => {
  const { set } = useQueryParams()

  const { data, isLoading } = useKnowledgeBaseResources({
    tags: KnowledgeSourceTags.FAQ,
    page_size: PAGE_SIZE,
    page: page,
  })

  const { faqs, total } = useMemo(
    () => ({
      faqs: data?.data?.results || [],
      total: data?.data?.count || 0,
    }),
    [data]
  )

  return (
    <>
      {!total && !isLoading && (
        <EmptyState
          img={faqEmptyState}
          title="Start by uploading FAQ"
          subtitle="Any FAQ uploaded will be available here. Manage resources that
            educated your AI."
          modalKey={PopupKeys.ADD_FAQS_MODAL}
          buttonLabel="Add FAQ"
        />
      )}
      {!!data && !!total && (
        <>
          <FAQCardsList faqs={faqs} loading={isLoading} />
          <AppPagination
            total={Math.ceil(total / PAGE_SIZE)}
            page={page}
            onChange={(page) => set(QUERY_KEYS.PAGE, page)}
          />
        </>
      )}
      <FAQModal />
    </>
  )
}

export default FAQs
