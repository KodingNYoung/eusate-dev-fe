"use client"
import { IconNames } from "@/utils/iconNames"
import { FC } from "@/utils/types"
import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useState,
} from "react"

export type ToastType = "success" | "error" | "info" | "warning" | "default"
export type ToastVariantType = "filled" | "outlined"
type SnackbarActionType = { label: string; fn: () => void }

type ToastContextType = {
  visible: boolean
  show: (
    title: ReactNode,
    options?: {
      subtitle?: ReactNode
      type?: ToastType
      variant?: ToastVariantType
      actions?: SnackbarActionType[]
      icon?: IconNames
    }
  ) => void
  hide: () => void
  type: ToastType
  variant: ToastVariantType
  actions?: SnackbarActionType[]
  title: ReactNode
  subtitle?: ReactNode
  icon?: IconNames
}

export const ToastContext = createContext<ToastContextType>({
  visible: true,
  type: "default",
  variant: "outlined",
  title: "",
  show: () => {},
  hide: () => {},
})

export const useToast = () => {
  const context = useContext(ToastContext)
  if (!context) {
    throw new Error("useToast should be called inside a ToastContextProvider")
  }
  return context
}

const ToastContextProvider: FC = ({ children }) => {
  const [visible, setVisiblity] = useState(false)
  const [type, setType] = useState<ToastType>("default")
  const [variant, setVariant] = useState<ToastVariantType>("outlined")
  const [title, setTitle] = useState<ReactNode>("Title")
  const [subtitle, setSubtitle] = useState<ReactNode>("Subtitle")
  const [actions, setActions] = useState<SnackbarActionType[]>([])
  const [icon, setIcon] = useState<IconNames>()

  const show: ToastContextType["show"] = useCallback((title, options) => {
    const {
      subtitle,
      type = "default",
      variant = "outlined",
      actions = [],
      icon,
    } = options || {}
    setTitle(title)
    setSubtitle(subtitle)
    setVariant(variant)
    setType(type)
    setActions(actions)
    setIcon(icon)
    setVisiblity(true)
  }, [])
  const hide = useCallback(() => {
    setVisiblity(false)
  }, [])

  return (
    <ToastContext.Provider
      value={{
        visible,
        variant,
        type,
        title,
        subtitle,
        actions,
        icon,
        show,
        hide,
      }}
    >
      {children}
    </ToastContext.Provider>
  )
}

export default ToastContextProvider
