import SearchQuery from "./Search"
import Sort from "./Sort"
import Invite from "./InviteBtn"
import { FC } from "@/utils/types"

type Props = {
  filterQuery: string | null
  setPage: React.Dispatch<React.SetStateAction<number>>
  setFilterQuery: React.Dispatch<React.SetStateAction<string | null>>
}

const Header: FC<Props> = ({ filterQuery, setFilterQuery, setPage }) => {
  return (
    <header className="w-full flex items-center justify-between">
      <div className="flex items-center gap-3 min-w-[50%]">
        <SearchQuery
          setPage={setPage}
          filterQuery={filterQuery}
          setFilterQuery={setFilterQuery}
        />
        <Sort />
      </div>
      <Invite />
    </header>
  )
}
export default Header
