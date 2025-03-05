"use client"

import { PopupKeys } from "@/utils/enums"
import { FC } from "@/utils/types"
import { createContext, useCallback, useState } from "react"

type ModalContextType = {
  isOpen: boolean
  open: (id: PopupKeys) => void
  close: () => void
  key?: PopupKeys
}

const ModalContext = createContext<ModalContextType>({
  isOpen: false,
  open: () => {},
  close: () => {},
})

export const ModalProvider: FC = ({ children }) => {
  const [key, setKey] = useState<PopupKeys>()

  const open = useCallback((key: PopupKeys) => setKey(key), [])

  const close = useCallback(() => setKey(undefined), [])

  return (
    <ModalContext.Provider value={{ isOpen: Boolean(key), key, close, open }}>
      {children}
    </ModalContext.Provider>
  )
}

export default ModalContext
