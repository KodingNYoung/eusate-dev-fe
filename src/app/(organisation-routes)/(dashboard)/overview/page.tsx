import Overview from "@/components/views/overview"
import { DATE_FILTER } from "@/components/views/overview/utils"
import { PageFC } from "@/utils/types"
import React from "react"

type SearchParamsPage = {
  date: string
}

const OverviewPage: PageFC<unknown, SearchParamsPage> = ({ searchParams }) => {
  const date = searchParams?.date || DATE_FILTER.PAST_WEEK
  return <Overview date={date} />
}

export default OverviewPage
