"use client"

import Typography from "@/components/atoms/Typography"
import Setup2FAForm from "../../setup-2fa/Setup2FAForm"
import { PopupKeys, TwoFAMethods } from "@/utils/enums"
import { useState } from "react"
import TwoFAModal from "./_components/TwoFAModal"
import { FC } from "@/utils/types"
import { useModal } from "@/hooks/popupHooks"

const Security: FC = () => {
  const { open } = useModal()
  const [method, setMethod] = useState<TwoFAMethods | null>(null)
  const onMethodSelect = (method: TwoFAMethods) => setMethod(method)
  const action = () => open(PopupKeys.TWOFA)
  return (
    <section className="grid border-1 rounded-x20 px-8 pt-8 border-gray-100 w-full">
      <Typography variant="caption-lg" className="text-gray-300 uppercase">
        Authentication methods
      </Typography>
      <div className="w-3/4">
        <Setup2FAForm
          use="dialog"
          classNames={{
            wrapper: "grid grid-cols-2 gap-5",
            button: "w-full max-w-96",
          }}
          onMethodSelect={onMethodSelect}
          dialogAction={action}
        />
        {method && <TwoFAModal method={method} />}
      </div>
    </section>
  )
}

export default Security
