import { FC } from "@/utils/types"
import React from "react"
import Sidebar from "./Sidebar"
import BottomNav from "./BottomNav"

/**
 * This component should house something like a provider for the current navigation state or something.
 * @returns Naviagtion component for the dashboard for both laptop and mobile view
 */

const DashboardNavigation: FC = () => {
  return (
    <>
      <Sidebar />
      <BottomNav />
    </>
  )
}

export default DashboardNavigation
