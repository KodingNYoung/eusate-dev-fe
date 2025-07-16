import { invitePaperBg } from "@/assets/images/svg"
import Icon from "@/components/atoms/Icon"
import Typography from "@/components/atoms/Typography"
import Button from "@/components/molecules/Buttons"
import { ROUTES } from "@/utils/constants"
import { FC, MemberInviteType } from "@/utils/types"
import Link from "next/link"
import React from "react"

type Props = {
  invite: MemberInviteType
}

const AcceptedCard: FC<Props> = ({ invite }) => {
  return (
    <>
      <div className="fill-info-50 [&_svg]:w-full">{invitePaperBg}</div>
      <div className="p-8 sm:p-12 pt-2 flex flex-col items-center gap-4 sm:gap-6  text-center">
        <div className="size-12 min-w-12 min-h-12 bg-info-50 flex items-center justify-center rounded-lg">
          <Icon
            name="icon-warning-circle"
            size={24}
            className="text-info-500"
          />
        </div>
        <Typography as="h2" className="text-semibold-lg text-black">
          You already joined {invite.organisation.name}&apos;s workspace
        </Typography>
        <Typography
          as="p"
          className="text-regular-base text-gray-400 min-w-full"
        >
          You already accepted the invitation to join this workspace. Click the
          button below to go to your dashboard.
        </Typography>
        <Link href={ROUTES.OVERVIEW}>
          <Button
            endContent={<Icon name="icon-export" size={20} />}
            classNames={{ root: "py-2.5 px-5", label: "text-medium-sm" }}
          >
            View dashboard
          </Button>
        </Link>
      </div>
    </>
  )
}

export default AcceptedCard
