import type { Metadata } from "next"
import "../styles/globals.css"
import { plusJakartaSans } from "@/assets/font"
import { LayoutFC } from "@/utils/types"
import { NextUIProvider } from "@nextui-org/react"
import ReactQueryProvider from "@/providers/reactQueryProvider"
import { Slide, ToastContainer } from "react-toastify"
import { getSession } from "@/lib/sessions"
import { AuthProvider } from "@/providers/authProvider"

export const metadata: Metadata = {
  title: {
    default: "eusate",
    template: "%s | eusate",
  },
  description: "Supercharge your customer support with our AI powered agents",
}

const RootLayout: LayoutFC = async ({ children }) => {
  const session = await getSession()
  return (
    <html lang="en" className={plusJakartaSans.variable}>
      <body>
        <AuthProvider initialSession={session ?? undefined}>
          <ReactQueryProvider>
            <NextUIProvider>{children}</NextUIProvider>
          </ReactQueryProvider>
        </AuthProvider>
        <ToastContainer
          position="top-right"
          autoClose={3000}
          closeButton={false}
          icon={false}
          limit={1}
          hideProgressBar
          newestOnTop
          closeOnClick={false}
          rtl={false}
          pauseOnFocusLoss={false}
          draggable
          pauseOnHover
          transition={Slide}
        />
      </body>
    </html>
  )
}

export default RootLayout
