import NavItem from "../../dashboard/_components/NavItem"
import { SETTINGS_TABS } from "../utils"
import { cls } from "@/utils/helpers"

const SettingsNav = () => {
  return (
    <section>
      {SETTINGS_TABS.map(({ link, id, ...route }) => (
        <NavItem
          key={id}
          use="settings"
          link={`${link}`}
          {...route}
          classNames={{
            root: cls(
              "text-semibold-base",
              "border-l-2 border-l-gray-50 w-38 space-x-2 py-4",
              "data-[active=true]:border-l-gray-900 !data-[active=true]:text-gray-900 rounded-none"
            ),
            label: cls(
              "w-full text-gray-400 text-semibold-base group-hover/navitem:text-gray-200"
            ),
            icon: cls("text-gray-400 group-hover/navitem:text-gray-200"),
          }}
        />
      ))}
    </section>
  )
}

export default SettingsNav
