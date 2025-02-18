"use client"

import { FC } from "@/utils/types"
import React, { useMemo, useState } from "react"
import "react-quill-new/dist/quill.snow.css"
import "./editor.css"
import dynamic from "next/dynamic"

type Props = {
  content?: string
  onContentChange: () => void
}

const Editor: FC<Props> = ({ content = "", onContentChange }) => {
  const [value, setValue] = useState(content)

  const wordCount = useMemo(() => {
    if (!value) return 0
    const text = value.replace(/<[^>]+>/g, "").trim()
    return text ? text.split(/\s+/).length : 0
  }, [value])

  const ReactQuill = useMemo(
    () => dynamic(() => import("react-quill-new"), { ssr: false }),
    []
  )

  return (
    <div className="text-editor grid flex-1 relative">
      <input type="hidden" value={value} name="content" readOnly />
      <div className="absolute top-0 left-0 w-full h-full">
        <Toolbar count={wordCount} />
        <ReactQuill
          theme="snow"
          value={value.replace("&nbsp", " ")}
          onChange={(value) => {
            setValue(value)
            onContentChange()
          }}
          placeholder="Start typing..."
          modules={{
            toolbar: "#quill-toolbar",
          }}
        />
      </div>
    </div>
  )
}

export default Editor

type ToolbarProps = { count: number }

const Toolbar: FC<ToolbarProps> = ({ count }) => {
  return (
    <div id="quill-toolbar">
      <span className="text-semibold-base">
        {count} {count === 1 ? "word" : "words"}
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
