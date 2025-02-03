import ModalContext from "@/providers/modalProvider"
import { PopupKeys } from "@/utils/enums"
import { TWClassNames } from "@/utils/types"
import {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react"

type PopupHookProps = {
  classNames?: { opened?: TWClassNames; closed?: TWClassNames }
  delay?: number
}
const DEFAULT_CLOSED_CLASS = "-top-[100vh]"
const DEFAULT_OPENED_CLASS = "top-0"

export const usePopup = (
  isOpen: boolean,
  { classNames, delay = 500 }: PopupHookProps
) => {
  const ref = useRef<HTMLDivElement>(null)
  const timer = useRef<NodeJS.Timeout>()

  useEffect(() => {
    clearTimeout(timer.current)
    const classlist = ref.current?.classList
    if (!isOpen) {
      // case: closed
      timer.current = setTimeout(() => {
        classlist?.add(classNames?.closed || DEFAULT_CLOSED_CLASS)
        classlist?.remove(classNames?.opened || DEFAULT_OPENED_CLASS)
      }, delay)
    } else {
      // case: opened
      classlist?.add(classNames?.opened || DEFAULT_OPENED_CLASS)
      classlist?.remove(classNames?.closed || DEFAULT_CLOSED_CLASS)
    }
  }, [isOpen, classNames, delay])

  return {
    isOpen,
    ref,
  }
}

export const useVisible = () => {
  const [visible, setVisibility] = useState(false)

  const open = useCallback(() => setVisibility(true), [])
  const close = useCallback(() => setVisibility(false), [])
  const toggle = useCallback(() => setVisibility((curr) => !curr), [])

  return {
    open,
    close,
    toggle,
    visible,
  }
}

export const useModal = (_key?: PopupKeys) => {
  const { open, close, isOpen, key } = useContext(ModalContext)

  const _isOpen = useMemo(() => isOpen && key === _key, [key, _key, isOpen])

  const _open = useCallback(
    (quickKey?: PopupKeys) => {
      console.log("Hello")
      if (_key) {
        console.log("Hello, _key", _key)
        open(_key)
      } else if (quickKey) {
        console.log("Hello, quickKey", quickKey)
        open(quickKey)
      } else {
        console.log("Hello, no key")
        throw "No key provided for this modal"
      }
    },
    [_key, open]
  )

  return {
    isOpen: _isOpen,
    close,
    open: _open,
  }
}
