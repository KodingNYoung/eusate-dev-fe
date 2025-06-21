import { ROUTES } from "@/utils/constants"
import { redirect } from "next/navigation"

const SettingsPage = () => redirect(ROUTES.PROFILE)

export default SettingsPage
