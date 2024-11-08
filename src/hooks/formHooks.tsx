import { useToast } from "@/providers/toastProviders"
import { extractZodErrors, getFormdataFromFormRef } from "@/utils/helpers"
import { FormState } from "@/utils/types"
import { RefObject, useCallback, useEffect, useMemo, useState } from "react"
import { ZodObject, ZodTypeAny } from "zod"

export const useValidation = (
  schema: ZodTypeAny,
  formRef: RefObject<HTMLFormElement>
) => {
  const [touched, setTouched] = useState<{ [field: string]: boolean }>({})
  const [errors, setErrors] = useState<{ [field: string]: string }>({})

  const hasErrors = useMemo(
    () => !!Object.values(errors).filter(Boolean).length,
    [errors]
  )

  const validate = useCallback(
    (field?: string) => {
      const formdata = getFormdataFromFormRef(formRef)

      if (!formdata) throw new Error("No form found, pass a form's ref object")
      if (!(schema instanceof ZodObject))
        throw new Error("Invalid schema, must be object")

      const payload = Object.fromEntries(formdata)

      const partialSchema = field ? schema.pick({ [field]: true }) : schema
      const result = partialSchema.safeParse(payload)

      if (result.success) {
        setErrors((curr) => (field ? { ...curr, [field]: "" } : {}))
      } else {
        const errors = extractZodErrors(result.error)
        setErrors((curr) => ({ ...curr, ...errors }))
      }
    },
    [formRef, schema]
  )

  const markFieldTouched = useCallback(
    (field: string) => {
      setTouched((curr) => ({ ...curr, [field]: true }))
      validate(field)
    },
    [validate]
  )

  const onSubmit = useCallback(() => {
    const formdata = getFormdataFromFormRef(formRef)
    if (!formdata) return
    const fields = Object.keys(Object.fromEntries(formdata)).reduce(
      (cumm, curr) => ({ ...cumm, [curr]: true }),
      {} as typeof touched
    )

    setTouched(fields)
    validate()
  }, [formRef, validate])

  useEffect(() => {
    const form = formRef?.current
    if (!form) return
    form.addEventListener("submit", onSubmit)

    return () => form?.removeEventListener("submit", onSubmit)
  }, [formRef, onSubmit])

  return { touched, errors, hasErrors, validate, markFieldTouched }
}

export const useFormToast = (state: FormState, showSuccess?: boolean) => {
  const toast = useToast()

  useEffect(() => {
    if (!state) return
    if ("error" in state) {
      toast.show(state.error.message, { type: "error", variant: "outlined" })
    } else if (showSuccess && "success" in state) {
      toast.show(state.success.message, {
        type: "success",
        variant: "outlined",
      })
    }
  }, [state, showSuccess])

  return null
}
