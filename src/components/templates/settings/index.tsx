"use client"

import { FC } from "@/utils/types"
import SettingsNav from "./_components/SettingsNav"
import Typography from "@/components/atoms/Typography"
import SettingsProvider from "@/providers/settingsProvider"

const SettingsLayout: FC = ({ children }) => {
  return (
    <div className="bg-white sm:rounded-x20 px-4 sm:px-5 py-3 sm:py-4.5 h-full flex flex-col gap-8 sm:gap-9 relative">
      <header className="grid gap-2">
        <Typography className="text-bold-base sm:text-bold-2xl text-gray-900">
          Settings
        </Typography>
        <Typography className="text-regular-xs sm:text-regular-sm text-black-50">
          Empower your AI with curated knowledge.
        </Typography>
      </header>

      <main className="flex items-start gap-16 w-full">
        <SettingsNav />
        <SettingsProvider>{children}</SettingsProvider>
      </main>
    </div>
  )
}

export default SettingsLayout
