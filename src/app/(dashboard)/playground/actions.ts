"use server"

import { FormState } from "@/utils/types"

export const sendMessage = async (
  state: FormState,
  formdata: FormData
): Promise<FormState> => {
  console.log(Object.fromEntries(formdata), state)
  return new Promise((res) => res)
}

export const editUserMessage = async (
  formdata: FormData
): Promise<FormState> => {
  console.log(Object.fromEntries(formdata))
  return new Promise((res) => res)
}
