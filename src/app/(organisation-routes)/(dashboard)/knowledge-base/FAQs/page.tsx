import FAQs from "@/components/views/faqs"
import { PageFC } from "@/utils/types"
import React from "react"

const FAQsPage: PageFC<unknown, { page: string }> = async ({
  searchParams,
}) => {
  const { page } = searchParams || {}

  return <FAQs page={Number(page) || 1} />
}

export default FAQsPage
