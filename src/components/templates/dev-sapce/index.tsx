import Banner from "@/components/organisms/Banner"
import { FC } from "@/utils/types"
import Link from "next/link"
import React from "react"

const DevSpaceLayout: FC = ({ children }) => {
  return (
    <div className="bg-white sm:rounded-x20 px-4 sm:px-5 py-3 sm:py-4.5 h-full flex flex-col gap-4 sm:gap-5 relative">
      <Banner
        icon="icon-code"
        title="DevConfig"
        subtitle={
          <>
            Allow the AI to do more by configuring actions from your platform.{" "}
            <Link href="" className="underline">
              Learn more
            </Link>
          </>
        }
      />
      {children}
    </div>
  )
}

export default DevSpaceLayout
