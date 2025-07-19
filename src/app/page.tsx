import { ROUTES } from "@/utils/constants"
import { PageFC } from "@/utils/types"
import { redirect } from "next/navigation"

const HomePage: PageFC = () => redirect(ROUTES.LOGIN)

export default HomePage
