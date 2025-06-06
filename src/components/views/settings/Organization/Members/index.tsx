"use client"

import { useState } from "react"
import Header from "./MemberHeader"
import Area from "./MembersArea"
import { useQueryParams } from "@/hooks/utilityHooks"
import { MEMBER_QUERY_KEYS } from "./utils"
import MemberModal from "./_components/MembersModals"

const Members = () => {
  const { get } = useQueryParams()
  const [filterQuery, setFilterQuery] = useState<string | null>(
    get(MEMBER_QUERY_KEYS.QUERY)
  )
  const [page, setPage] = useState<number>(
    () => parseInt(get(MEMBER_QUERY_KEYS.PAGE) ?? "") || 1
  )

  return (
    <section className="flex flex-col w-full border-[1px] rounded-x20 border-gray-100 p-12 gap-y-5">
      <Header
        filterQuery={filterQuery}
        setFilterQuery={setFilterQuery}
        setPage={setPage}
      />
      <Area filterQuery={filterQuery} page={page} setPage={setPage} />
      <MemberModal />
    </section>
  )
}

export default Members
