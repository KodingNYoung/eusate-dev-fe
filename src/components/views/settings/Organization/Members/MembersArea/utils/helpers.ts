import { Member, Ord } from "../../utils"
import { ROWS_PER_PAGE } from "./const"

export const filterItems = (members: Member[], filterQuery: string | null) => {
  let filteredMember = [...members]
  if (filterQuery) {
    filteredMember = filteredMember.filter((member) =>
      member.name.toLowerCase().includes(filterQuery.toLowerCase())
    )
  }
  return filteredMember
}

export const sortItems = (
  currentPageMembers: Member[],
  sortby: keyof Pick<Member, "last_seen" | "date_added"> | "none",
  ord: Ord
) => {
  if (sortby === "none") return
  return [...currentPageMembers].sort((a, b) => {
    const first = new Date(a[sortby])
    const second = new Date(b[sortby])
    const cmp = first < second ? -1 : first < second ? 1 : 0
    return ord === "descending" ? -cmp : cmp
  })
}

export const setPageContent = (page: number, filteredMembers: Member[]) => {
  const start = (page - 1) * ROWS_PER_PAGE
  const end = start + ROWS_PER_PAGE
  return filteredMembers.slice(start, end)
}
