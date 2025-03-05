"use client"

import { FC, KnowledgeSource } from "@/utils/types"
import React from "react"
import TextEditorForm from "./TextEditorForm"

type Props = {
  resource?: KnowledgeSource
}

const TextEditor: FC<Props> = ({ resource }) => {
  return <TextEditorForm resource={resource} />
}

export default TextEditor
