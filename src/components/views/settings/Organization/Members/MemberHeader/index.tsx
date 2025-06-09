import SearchQuery from "./Search"
import Sort from "./Sort"
import Invite from "./InviteBtn"
import { FC } from "@/utils/types"

type Props = {
  searchQuery: string | null
  setPage: React.Dispatch<React.SetStateAction<number>>
  setSearchQuery: React.Dispatch<React.SetStateAction<string | null>>
}

const Header: FC<Props> = ({ searchQuery, setSearchQuery, setPage }) => {
  return (
    <header className="w-full flex items-center justify-between">
      <div className="flex items-center gap-3 min-w-[50%]">
        <SearchQuery
          setPage={setPage}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />
        <Sort />
      </div>
      <Invite />
    </header>
  )
}
export default Header
