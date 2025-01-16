"use client"

import React from "react"
import EmptyState from "./_components/EmptyState"
import FAQModal from "./_components/FAQModal"
import { FC, KnowledgeSource } from "@/utils/types"
import FAQCardsList from "./_components/FAQCardsList"
import AppPagination from "@/components/organisms/AppPagination"
import { useQueryParams } from "@/hooks/utilityHooks"

type Props = {
  data?: KnowledgeSource[]
  hasFetchError?: boolean
  total: number
  page: number
  pageSize: number
}
const QUERY_KEYS = {
  PAGE: "page",
} as const

const FAQs: FC<Props> = ({ data, total, page, pageSize }) => {
  const { set } = useQueryParams()

  return (
    <>
      {!total && <EmptyState />}
      {!!data && !!total && (
        <>
          <FAQCardsList faqs={data} />
          <AppPagination
            total={Math.ceil(total / pageSize)}
            page={Number(page)}
            onChange={(page) => set(QUERY_KEYS.PAGE, page)}
          />
        </>
      )}
      <FAQModal />
    </>
  )
}

export default FAQs
