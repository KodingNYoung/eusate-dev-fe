"use client"

import Typography from "@/components/atoms/Typography"
import { FC } from "@/utils/types"
import React, { useMemo } from "react"
import OverviewDateFilter from "./_components/OverviewDateFilter"
import { getDateRange } from "./utils"
import RecentTickets from "./_components/RecentTickets"
import TopCards from "./_components/TopCards"
import OpenTicketOverview from "./_components/OpenTicketOverview"
import ResourceTypesOverview from "./_components/ResourceTypesOverview"
import ChannelDistribution from "./_components/ChannelDistribution"
import WalletOverview from "./_components/WalletOverview"
import RecentlyAddedResources from "./_components/RecentlyAddedResources"

type Props = {
  date: string
}

const Overview: FC<Props> = ({ date }) => {
  const { start, end } = useMemo(() => getDateRange(date), [date])

  return (
    <div className="bg-white sm:rounded-x20 py-3 sm:py-4.5 h-full w-full grid content-start gap-5 relative">
      <header className="grid gap-1.5 px-4 sm:px-5">
        <Typography className="text-bold-base sm:text-bold-2xl text-gray-900">
          Dashboard
        </Typography>
        <Typography className="text-regular-xs sm:text-regular-sm text-black-50">
          Empower your AI with curated knowledge.
        </Typography>
      </header>
      <main className="grid items-start gap-5 w-full pb-20">
        <OverviewDateFilter date={date} />
        <TopCards date={date} start={start} end={end} />
        <div className="grid items-start gap-5 px-4 sm:px-5 min-[854px]:grid-cols-[repeat(2,_minmax(343px,_1fr))]">
          <RecentTickets start={start} end={end} />
          <OpenTicketOverview date={date} start={start} end={end} />
          <ResourceTypesOverview start={start} end={end} />
          <ChannelDistribution start={start} end={end} />
          <WalletOverview start={start} end={end} />
          <RecentlyAddedResources start={start} end={end} />
        </div>
      </main>
    </div>
  )
}

export default Overview
