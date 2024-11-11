import { FC } from "@/utils/types"
import React from "react"
import Sidebar from "./Sidebar"

/**
 * This component should house something like a provider for the current navigation state or something.
 * @returns Naviagtion component for the dashboard for both laptop and mobile view
 */

const DashboardNavigation: FC = () => {
  return (
    <>
      <Sidebar />
      <footer className="flex sm:hidden fixed bottom-0 left-0 w-full bg-black-100 text-gray-500">
        bottom bar
      </footer>
    </>
  )
}

export default DashboardNavigation
