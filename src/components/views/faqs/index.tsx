import React from "react"
import EmptyState from "./_components/EmptyState"
import FAQModal from "./_components/FAQModal"
import { FC, KnowledgeSource } from "@/utils/types"
import FAQCardsList from "./_components/FAQCardsList"
import Pagination from "@/components/organisms/Table/Pagination"

type Props = {
  data?: KnowledgeSource[]
  hasFetchError?: boolean
  total: number
}

const FAQs: FC<Props> = ({ data, total }) => {
  return (
    <>
      {!total && <EmptyState />}
      {!!data && !!total && (
        <>
          <FAQCardsList faqs={data} />
          <Pagination />
        </>
      )}
      <FAQModal />
    </>
  )
}

export default FAQs
