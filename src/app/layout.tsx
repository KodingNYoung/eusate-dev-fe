import type { Metadata } from "next"
import "../styles/globals.css"
import { plusJakartaSans } from "@/assets/font"
import { LayoutFC } from "@/utils/types"
import { NextUIProvider } from "@nextui-org/react"

export const metadata: Metadata = {
  title: {
    default: "eusate",
    template: "%s | eusate",
  },
  description: "Supercharge your customer support with our AI powered agents",
}

const RootLayout: LayoutFC = ({ children }) => {
  return (
    <html lang="en" className={plusJakartaSans.variable}>
      <body>
        <NextUIProvider>{children}</NextUIProvider>
      </body>
    </html>
  )
}

export default RootLayout
