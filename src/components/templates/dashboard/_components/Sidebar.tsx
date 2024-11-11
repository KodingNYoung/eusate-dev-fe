import React from "react"
import SidebarUserInfo from "./SidebarUserInfo"
import SidebarNav from "./SidebarNav"
import Typography from "@/components/atoms/Typography"

const Sidebar = () => {
  return (
    <aside className="hidden sm:block w-20 relative z-[1]">
      <div className="flex flex-col gap-3 px-4.5 hover:px-3 py-2 bg-black-100 text-gray-500 rounded-r-2xl h-full group w-full hover:w-[272px] transition-all duration-300 [&_*]:transition-all [&_*]:duration-300">
        <SidebarUserInfo />
        <section className="flex flex-col gap-3">
          <header className="px-1 group-hover:px-3">
            <Typography
              variant="regular-xs"
              as="h3"
              className="uppercase text-gray-500"
            >
              menu
            </Typography>
          </header>
          <SidebarNav />
        </section>
      </div>
    </aside>
  )
}

export default Sidebar
