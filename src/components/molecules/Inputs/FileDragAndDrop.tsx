"use client"

import { cls } from "@/utils/helpers"
import { FC, TWClassNames } from "@/utils/types"
import React, {
  ChangeEvent,
  HTMLProps,
  useEffect,
  useRef,
  useState,
} from "react"

type Slots = "root"
type Props = HTMLProps<HTMLInputElement> & {
  onFileChange: (files: FileList) => void
  files?: File[]
  accept?: string
  classNames?: { [slot in Slots]?: TWClassNames }
}

const FileDragAndDrop: FC<Props> = ({
  onFileChange,
  accept,
  classNames,
  className,
  children,
  files,
  id,
  name,
  ...props
}) => {
  const inputRef = useRef<HTMLInputElement>(null)
  const [isDraaggingOver, setIsdraggingOver] = useState(false)

  const handlefileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.currentTarget.files
    if (files?.[0]) {
      onFileChange(files)
    }
  }

  useEffect(() => {
    if (files && inputRef.current) {
      const dt = new DataTransfer()
      files.forEach((file) => {
        dt.items.add(file)
      })
      inputRef.current.files = dt.files
    }
  }, [files])

  return (
    <label
      htmlFor={id || name}
      className={cls(
        "rounded-2xl border border-dashed border-gray-100 transition-colors duration-200 block",
        isDraaggingOver && "!border-black !bg-gray-25",
        "hover:border-black hover:bg-gray-25",
        classNames?.root,
        className
      )}
    >
      <div className="w-full px-6 py-8 relative">
        <input
          type="file"
          ref={inputRef}
          className="absolute w-full h-full top-0 left-0 cursor-pointer opacity-0 z-2"
          multiple
          accept={accept}
          onChange={handlefileChange}
          id={id || name}
          name={name}
          onDragOver={(e) => {
            e.preventDefault()
            setIsdraggingOver(true)
          }}
          onDragLeave={() => setIsdraggingOver(false)}
          onDragEnd={() => setIsdraggingOver(false)}
          {...props}
        />
        <>{children}</>
      </div>
    </label>
  )
}

export default FileDragAndDrop
