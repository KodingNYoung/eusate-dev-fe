import React from "react"
import SidebarUserInfo from "./_components/SidebarUserInfo"
import SidebarNav from "./_components/SidebarNav"
import Typography from "@/components/atoms/Typography"
import Logo from "@/components/atoms/Logo"

const Sidebar = () => {
  return (
    <aside className="hidden sm:block w-[68px] fixed h-screen z-[12]">
      <div className="flex flex-col gap-3 px-3 py-2 bg-black-100 text-gray-500 rounded-r-2xl h-full group w-full hover:w-[272px] transition-all duration-300 [&_*]:transition-all [&_*]:duration-100">
        <SidebarUserInfo />
        <section className="flex flex-col gap-3">
          <header className="px-1.5">
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
        <div className="mt-auto bg-black py-6 px-1 overflow-hidden">
          <Logo
            type="full-gradient-white"
            className="h-7 min-w-[114px] w-fit"
          />
        </div>
      </div>
    </aside>
  )
}

export default Sidebar
