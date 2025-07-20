"use client"

import { FC } from "@/utils/types"
import React, { useEffect, useMemo, useState } from "react"
import "react-quill-new/dist/quill.snow.css"
import "./editor.css"
import dynamic from "next/dynamic"
import { formatComma } from "@/utils/helpers"

const ReactQuill = dynamic(() => import("react-quill-new"), { ssr: false })

type Props = {
  content?: string
  loading?: boolean
  onContentChange: () => void
}

const Editor: FC<Props> = ({ content = "", onContentChange, loading }) => {
  const [value, setValue] = useState(content)

  const wordCount = useMemo(() => {
    if (!value) return 0
    const text = value.replace(/<[^>]+>/g, "").trim()
    return text ? text.split(/\s+/).length : 0
  }, [value])

  useEffect(() => {
    setValue(content)
  }, [content])

  return (
    <div className="text-editor grid h-full relative">
      <input type="hidden" value={value} name="content" readOnly />
      <div className="absolute top-0 left-0 w-full h-full">
        <Toolbar count={wordCount} />
        {!loading && (
          <ReactQuill
            theme="snow"
            value={value}
            onChange={(value) => {
              setValue(value)
              onContentChange()
            }}
            className="[&_.ql-editor]:font-app [&_.ql-editor]:placeholder:text-gray-300 [&_.ql-editor]:text-gray-600 [&_.ql-editor]:text-regular-base"
            placeholder="Start typing..."
            modules={{
              toolbar: "#quill-toolbar",
            }}
          />
        )}
      </div>
    </div>
  )
}

export default Editor

type ToolbarProps = { count: number }

const Toolbar: FC<ToolbarProps> = ({ count }) => {
  return (
    <div id="quill-toolbar" className="[&_*]:font-app">
      <span className="text-semibold-base">
        {formatComma(count)} {count === 1 ? "word" : "words"}
      </span>
      <div className="flex-1 flex items-center justify-end gap-2.5">
        <select
          className="ql-header"
          defaultValue={""}
          onChange={(e) => e.persist()}
        >
          <option value="" />
          <option value="1" />
          <option value="2" />
          <option value="3" />
          <option value="4" />
          <option value="5" />
          <option value="6" />
        </select>
        <button className="ql-bold" />
        <button className="ql-italic" />
        <button className="ql-underline" />
        <button className="ql-strike" />
        <button className="ql-link" />
        <select
          className="ql-align"
          defaultValue=""
          onChange={(e) => e.persist()}
        >
          <option value="" />
          <option value="center" />
          <option value="right" />
          <option value="justify" />
        </select>
        <button className="ql-list" value="bullet" />
        <button className="ql-list" value="ordered" />
      </div>
    </div>
  )
}
