import { FC } from "@/utils/types"
import React from "react"
import Typography from "@/components/atoms/Typography"
import Icon from "@/components/atoms/Icon"
import CopyButton from "@/components/molecules/Buttons/CopyButton"

type Props = {
  svg: string
  secretKey: string
}

const QRCode: FC<Props> = ({ svg, secretKey }) => {
  return (
    <div className="flex items-center justify-center lg:justify-start flex-col lg:flex-row gap-10 mt-10">
      <div
        className="w-[200px] max-w-[200px] h-[200px] max-h-[200px]"
        dangerouslySetInnerHTML={{ __html: svg }}
      />
      <div className="grid gap-5 justify-items-center lg:justify-items-start text-center lg:text-left">
        <Typography variant="regular-xs" className="text-gray-500">
          If u have any problems scanning the code enter the code below into the
          authenticator app
        </Typography>
        <CopyButton
          text={secretKey}
          className="bg-gray-50 flex items-center gap-2 w-fit px-3 py-1 rounded-[100px]"
        >
          <Typography variant="semibold-xs">{secretKey}</Typography>
          <Icon name="icon-copy" className="text-gray-500" />
        </CopyButton>
      </div>
    </div>
  )
}

export default QRCode
