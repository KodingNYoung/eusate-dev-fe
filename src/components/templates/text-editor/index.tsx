"use client"

import { FC, KnowledgeSource } from "@/utils/types"
import React from "react"
import ToastContextProvider from "@/providers/toastProviders"
import TextEditorForm from "./TextEditorForm"

type Props = {
  resource?: KnowledgeSource
}

const TextEditor: FC<Props> = ({ resource }) => {
  return (
    <ToastContextProvider>
      <TextEditorForm resource={resource} />
    </ToastContextProvider>
  )
}

export default TextEditor
