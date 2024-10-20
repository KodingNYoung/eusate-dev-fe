import { FC } from "@/utils/types"
import Image from "next/image"
import React from "react"
import qrcode from "@/assets/images/qr-code.svg"
import Typography from "@/components/atoms/Typography"
import Icon from "@/components/atoms/Icon"

const QRCode: FC = () => {
  return (
    <div className="flex items-center justify-center sm:justify-start flex-col sm:flex-row gap-10 mt-10">
      <Image src={qrcode} height={200} width={200} alt="qr code" />
      <div className="grid gap-5 justify-items-center sm:justify-items-start text-center sm:text-left">
        <Typography variant="regular-xs" className="text-gray-500">
          If u have any problems scanning the code enter the code below into the
          authenticator app
        </Typography>
        <button className="bg-gray-50 flex items-center gap-2 w-fit px-3 py-1 rounded-[100px]">
          <Typography variant="semibold-base">EU235 8433 8474 4848</Typography>
          <Icon name="icon-copy" className="text-gray-500" />
        </button>
      </div>
    </div>
  )
}

export default QRCode
