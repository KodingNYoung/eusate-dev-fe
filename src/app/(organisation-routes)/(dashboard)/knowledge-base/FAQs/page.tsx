import FAQs from "@/components/views/faqs"
import { PageFC } from "@/utils/types"
import React from "react"

const FAQsPage: PageFC<unknown, { page: number }> = async ({
  searchParams,
}) => {
  const { page } = searchParams || {}

  return <FAQs page={page || 1} />
}

export default FAQsPage
