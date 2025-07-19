import { resendOtp } from "@/app/(auth)/actions"
import Icon from "@/components/atoms/Icon"
import Typography from "@/components/atoms/Typography"
import SubmitButton from "@/components/molecules/Buttons/SubmitButton"
import OtpInput from "@/components/molecules/Inputs/OtpInput"
import { toaster } from "@/components/molecules/Toast"
import { useFormToast, useValidation } from "@/hooks/formHooks"
import { useCountdown } from "@/hooks/utilityHooks"
import { sendCodePayloadSchema } from "@/lib/schemas/auth"
import { TwoFAMethods } from "@/utils/enums"
import { convertSecondsToTime } from "@/utils/helpers"
import { FC, FormState } from "@/utils/types"
import { useRouter } from "next/navigation"
import React, { useEffect, useRef, useState } from "react"
import { useFormState } from "react-dom"

type Props = {
  submitAction: (state: FormState, formdata: FormData) => Promise<FormState>
  onSuccess?: (state: FormState) => void
  onError?: (state: FormState) => void
  method: TwoFAMethods
}

const OTP_RESEND_TIMEOUT = 2 * 60 // 2 minutes

const CodeInputForm: FC<Props> = ({ submitAction, method }) => {
  const router = useRouter()
  const formRef = useRef<HTMLFormElement>(null)
  const { start, stop, secondsLeft, isCounting } = useCountdown()

  const [otp, setOtp] = useState("")

  const { hasErrors, markFieldTouched } = useValidation(
    sendCodePayloadSchema,
    formRef
  )

  const [state, action] = useFormState<FormState, FormData>(submitAction, {})
  useFormToast(state, true)

  //   functions
  const onCodeChange = (code: string) => {
    setOtp(code)
    setTimeout(() => markFieldTouched("code"), 50)
  }

  useEffect(() => {
    if ("success" in state || "redirectTo" in state) {
      router.push(state?.redirectTo || "")
    }
  }, [state, router])
  useEffect(() => {
    if (method === TwoFAMethods.EMAIL) {
      start(OTP_RESEND_TIMEOUT)
    }
    return () => stop()
  }, [method, start, stop])

  return (
    <form
      className="pt-10 pb-5 flex flex-col gap-10"
      action={action}
      ref={formRef}
    >
      <input name="code" value={otp} readOnly hidden />
      <div className="flex flex-col items-start gap-5">
        <OtpInput label="Enter 2FA code" onChange={onCodeChange} />
        {isCounting ? (
          <Typography className="text-medium-sm text-gray-500">
            Resend code in {convertSecondsToTime(secondsLeft)}
          </Typography>
        ) : (
          <SubmitButton
            variant="tetiary"
            classNames={{ root: "!py-2.5 px-3" }}
            formAction={async () => {
              const res = await resendOtp()
              if ("success" in res) {
                start(OTP_RESEND_TIMEOUT)
                toaster.success(res.success.message)
              } else if ("error" in res) {
                toaster.error(res.error.message)
              }
            }}
            startContent={<Icon name="icon-refresh-2" size={20} />}
          >
            Resend code
          </SubmitButton>
        )}
      </div>
      <SubmitButton size="xl" disabled={hasErrors}>
        Verify 2FA code
      </SubmitButton>
    </form>
  )
}

export default CodeInputForm
