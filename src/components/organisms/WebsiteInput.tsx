import { FC, FormState } from "@/utils/types"
import React, { useEffect, useRef, useState } from "react"
import Input, { InputProps } from "../molecules/Inputs"
import Icon from "../atoms/Icon"
import Spinner from "../atoms/Spinner"
import SubmitButton from "../molecules/Buttons/SubmitButton"
import { cls } from "@/utils/helpers"
import { useFormToast, useValidation } from "@/hooks/formHooks"
import {
  validateSubdomainUrlSchema,
  validateUrlSchema,
} from "@/lib/schemas/knowledge-base"
import { useFormState, useFormStatus } from "react-dom"
import {
  validateUrl,
  ValidateUrlResponse,
} from "@/app/(dashboard)/knowledge-base/actions"

type Props = InputProps & {
  onVerify: (url: string, name: string) => void
  domain?: string
}

const WebsiteInput: FC<Props> = ({
  classNames,
  name,
  domain,
  onVerify,
  ...props
}) => {
  const formRef = useRef<HTMLFormElement>(null)

  const { errors, validate, markFieldTouched } = useValidation(
    domain ? validateSubdomainUrlSchema(domain) : validateUrlSchema,
    formRef
  )

  const [state, action] = useFormState<
    FormState<ValidateUrlResponse>,
    FormData
  >(validateUrl, {})

//   useFormToast(
//     (state || errors.url ? { error: { message: errors.url } } : {}) as FormState
//   )

  useEffect(() => {
    if ("success" in state && state.payload?.valid && formRef.current) {
      const formdata = new FormData(formRef.current)
      onVerify(formdata.get("url") as string, name)
    }
  }, [state])

  return (
    <form className="flex items-end gap-5" action={action} ref={formRef}>
      <WebsiteCustomInput
        name="url"
        startComponent={<Icon name="icon-link" className="!text-regular-xl" />}
        placeholder="https://"
        classNames={{ ...classNames, root: cls("flex-1", classNames?.root) }}
        isError={
          !!errors?.url ||
          "error" in state ||
          ("success" in state && !state.payload?.valid)
        }
        isSuccess={"success" in state && state.payload?.valid}
        onChange={(e) => {
          validate(e.currentTarget.name)
        }}
        onBlur={(e) => markFieldTouched(e.currentTarget.name)}
        {...props}
      />
      <SubmitButton
        className="py-4 px-6 mb-1.5"
        classNames={{ label: "!text-semibold-sm" }}
        variant="tetiary"
        hideLoader
      >
        Validate
      </SubmitButton>
    </form>
  )
}

const WebsiteCustomInput: FC<InputProps> = ({
  endComponent,
  isError,
  isSuccess,
  ...props
}) => {
  const { pending } = useFormStatus()
  return (
    <Input
      endComponent={pending ? <Spinner /> : endComponent}
      isError={!pending && isError}
      isSuccess={!pending && isSuccess}
      {...props}
    />
  )
}

export default WebsiteInput
