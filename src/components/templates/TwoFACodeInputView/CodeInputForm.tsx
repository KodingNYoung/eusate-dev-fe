import SubmitButton from "@/components/molecules/Buttons/SubmitButton"
import OtpInput from "@/components/molecules/Inputs/OtpInput"
import { useFormToast, useValidation } from "@/hooks/formHooks"
import { sendCodePayloadSchema } from "@/lib/schemas/auth"
import { FC, FormState } from "@/utils/types"
import { useRouter } from "next/navigation"
import React, { useEffect, useRef, useState } from "react"
import { useFormState } from "react-dom"

type Props = {
  submitAction: (state: FormState, formdata: FormData) => Promise<FormState>
  onSuccess?: (state: FormState) => void
  onError?: (state: FormState) => void
}

const CodeInputForm: FC<Props> = ({ submitAction }) => {
  const router = useRouter()
  const [otp, setOtp] = useState("")

  const formRef = useRef<HTMLFormElement>(null)

  const { touched, hasErrors, markFieldTouched } = useValidation(
    sendCodePayloadSchema,
    formRef
  )

  const [state, action] = useFormState<FormState, FormData>(submitAction, {})
  useFormToast(state, true)

  //   functions
  const onCodeChange = (code: string) => {
    setOtp(code)
    setTimeout(() => markFieldTouched("code"), 10)
  }

  useEffect(() => {
    if ("success" in state) {
      router.push(state?.redirectTo || "")
    } else {
      if (state?.redirectTo) {
        router.push(state?.redirectTo || "")
      }
    }
  }, [state, router])

  return (
    <form className="py-10 flex flex-col gap-10" action={action} ref={formRef}>
      <input name="code" value={otp} readOnly hidden />
      <OtpInput label="Enter 2FA code" onChange={onCodeChange} />
      <SubmitButton size="xl" disabled={!touched.code || hasErrors}>
        Verify 2FA code
      </SubmitButton>
    </form>
  )
}

export default CodeInputForm
