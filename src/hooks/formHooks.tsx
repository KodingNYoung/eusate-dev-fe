import { useToast } from "@/providers/toastProviders"
import { extractZodErrors, getFormdataFromFormRef } from "@/utils/helpers"
import { FormState } from "@/utils/types"
import { RefObject, useCallback, useEffect, useRef, useState } from "react"
import { ZodObject, ZodTypeAny } from "zod"

export const useValidation = (
  schema: ZodTypeAny,
  formRef: RefObject<HTMLFormElement>
) => {
  const schemaRef = useRef(schema)

  const [touched, setTouched] = useState<Record<string, boolean>>({})
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({})
  const [hasErrors, setHasErrors] = useState(true)

  // TODO: re-evaluate this function and know why it runs twice if used as dependency in useCallbacks and useEffects
  const validate = useCallback(
    (field?: string) => {
      const schema = schemaRef.current

      const formdata = getFormdataFromFormRef(formRef)

      if (!formdata) return
      if (!(schema instanceof ZodObject)) return

      const payload = Object.fromEntries(formdata)

      const partialSchema = field ? schema.pick({ [field]: true }) : schema

      const result = partialSchema.safeParse(payload)

      //   let newErrors = { ...errors }
      // filter the errors to keep only current field in the schema.
      let newErrors = Object.keys(errors).reduce(
        (acc, field) => {
          if (schema.shape?.[field]) {
            return { ...acc, [field]: errors[field] }
          }
          return acc
        },
        {} as typeof errors
      )
      if (result.success) {
        newErrors = field ? { ...newErrors, [field]: "" } : {}
      } else {
        const errors = extractZodErrors(result.error)
        newErrors = { ...newErrors, ...errors }
      }

      // get the field errors
      const hasErrors = !!Object.values(newErrors).filter(Boolean).length
      const fieldErrors: Record<string, string> = {}

      Object.keys(newErrors).forEach((field) => {
        fieldErrors[field] = touched[field] ? newErrors[field] : ""
      })

      //save to state
      setHasErrors(hasErrors)
      setFieldErrors(fieldErrors)
      setErrors(newErrors)
    },
    [formRef, touched, errors, fieldErrors]
  )

  const markFieldTouched = useCallback(
    (field: string) => {
      setTouched((curr) => ({ ...curr, [field]: true }))
      //to delay the validation for slow library fields
      setTimeout(() => validate(field), 1)
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
  }, [formRef.current])

  useEffect(() => {
    schemaRef.current = schema
  }, [schema])
  useEffect(() => {
    const form = formRef?.current
    if (!form) return
    form.addEventListener("submit", onSubmit)
    validate()
    return () => form?.removeEventListener("submit", onSubmit)
  }, [formRef.current, onSubmit])

  return {
    touched,
    errors: fieldErrors,
    hasErrors,
    // validate,
    markFieldTouched,
  }
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
