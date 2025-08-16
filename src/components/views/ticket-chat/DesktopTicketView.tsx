import CustomerChat from "./customer-chat"
import React, { FC } from "react"
import Details from "./details"
import AIChat from "./copilot"
import { CopilotProvider } from "@/providers/ticketProviders"

const DesktopTicketView: FC = () => {
  return (
    <div className="hidden lg:grid w-full h-full grid-cols-[27%_46%_27%]">
      <Details />
      <CustomerChat />
      <CopilotProvider>
        <AIChat />
      </CopilotProvider>
    </div>
  )
}

export default DesktopTicketView
