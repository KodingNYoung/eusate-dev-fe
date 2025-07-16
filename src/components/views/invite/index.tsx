"use client"

import Logo from "@/components/atoms/Logo"
import { FC } from "@/utils/types"
import React, { useMemo } from "react"
import InviteCard from "./InviteCard"
import { useInvite } from "@/hooks/api/organisationHooks"
import dayjs from "dayjs"
import ExpiredCard from "./ExpiredCard"
import { MemberInviteStatus } from "@/utils/enums"
import DeclinedCard from "./DeclinedCard"
import AcceptedCard from "./AcceptedCard"

type Props = {
  inviteId: string
  organisationId: string
}

const Invite: FC<Props> = ({ inviteId, organisationId }) => {
  const { data, isLoading } = useInvite(inviteId, organisationId)

  const isExpired = useMemo(() => {
    if (!data?.date_created) return false
    const day7 = dayjs(data?.date_created).add(7, "day")
    return day7.isBefore(dayjs())
  }, [data])

  return (
    <main className="h-screen bg-[#F3F4F5] flex flex-col items-center gap-6 p-5 pt-20">
      <Logo type="full-gray" className="h-8" />
      <div className="bg-white w-[475px] max-w-full overflow-hidden rounded-xl">
        {data && data.status === MemberInviteStatus.ACCEPTED && (
          <AcceptedCard invite={data} />
        )}
        {data && data.status === MemberInviteStatus.REJECTED && (
          <DeclinedCard invite={data} />
        )}
        {data && isExpired && <ExpiredCard invite={data} />}
        {((data && data.status === MemberInviteStatus.PENDING && !isExpired) ||
          isLoading) && <InviteCard invite={data} isLoading={isLoading} />}
      </div>
    </main>
  )
}

export default Invite
