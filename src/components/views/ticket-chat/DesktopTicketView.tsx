import CustomerChat from "./customer-chat"
import React, { FC } from "react"
import Details from "./details"
// import AIChat from "./aichat"

const DesktopTicketView: FC = () => {
  return (
    <div className="hidden md:grid w-full h-full grid-cols-[27%_46%_27%]">
      <Details />
      <CustomerChat />
      {/* <AIChat /> */}
    </div>
  )
}

export default DesktopTicketView
