import { invitePaperBg } from "@/assets/images/svg"
import Icon from "@/components/atoms/Icon"
import Typography from "@/components/atoms/Typography"
import { FC, MemberInviteType } from "@/utils/types"
import React from "react"

type Props = {
  invite: MemberInviteType
}

const DeclinedCard: FC<Props> = ({ invite }) => {
  return (
    <>
      <div className="fill-error-50 [&_svg]:w-full">{invitePaperBg}</div>
      <div className="p-8 sm:p-12 pt-2 flex flex-col items-center gap-4 sm:gap-6  text-center">
        <div className="size-12 min-w-12 min-h-12 bg-error-50 flex items-center justify-center rounded-lg">
          <Icon
            name="icon-warning-circle"
            size={24}
            className="text-error-500"
          />
        </div>
        <Typography as="h2" className="text-semibold-lg text-black">
          You already declined the invitation to join {invite.organisation.name}
          &apos;s workspace
        </Typography>
        <Typography
          as="p"
          className="text-regular-base text-gray-400 min-w-full"
        >
          You already declined the invitation to join this workspace. Contact
          the admin of {invite.organisation.name}&apos;s workspace to resend an
          invitation.
        </Typography>
      </div>
    </>
  )
}

export default DeclinedCard
