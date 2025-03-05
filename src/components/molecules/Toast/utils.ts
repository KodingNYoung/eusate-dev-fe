import { IconNames } from "@/utils/iconNames"
import { TWClassNames } from "@/utils/types"

// TYPES
export type ToastType = "success" | "error" | "info" | "warning" | "default"
export type ToastVariantType = "filled" | "outlined"
export type ToastContentSlots =
  | "root"
  | "container"
  | "icon"
  | "textContent"
  | "title"
  | "subtitle"
  | "action"
  | "close"
type ToastVariant = `${ToastType}-${ToastVariantType}`

// CONSTANTS & MAPS
export const toastVariant: { [variant in ToastVariant]: TWClassNames } = {
  "success-filled": "bg-success-500",
  "success-outlined": "bg-success-50 border border-success-500",
  "error-filled": "bg-error-500",
  "error-outlined": "bg-error-50 border border-error-500",
  "info-filled": "bg-info-600",
  "info-outlined": "bg-info-50 border border-info-500",
  "warning-filled": "bg-warning-500",
  "warning-outlined": "bg-warning-50 border border-warning-500",
  "default-filled": "bg-black-100",
  "default-outlined": "bg-gray-50 border border-black-100",
}
export const toastIcon: { [type in ToastType]: IconNames } = {
  success: "icon-tick-circle-bold",
  error: "icon-danger-bold",
  info: "icon-info-circle-bold",
  warning: "icon-warning-2-bold",
  default: "icon-tick-circle-bold",
}
export const toastIconColor: { [variant in ToastVariant]: TWClassNames } = {
  "success-filled": "text-white-100",
  "success-outlined": "text-success-500",
  "error-filled": "text-white-100",
  "error-outlined": "text-error-500",
  "info-filled": "text-white-100",
  "info-outlined": "text-info-600",
  "warning-filled": "text-white-100",
  "warning-outlined": "text-warning-500",
  "default-filled": "text-white-100",
  "default-outlined": "text-black-100",
}
export const titleColor: { [variant in ToastVariantType]: TWClassNames } = {
  filled: "text-white-100",
  outlined: "text-gray-900",
}
export const subtitleColor: { [variant in ToastVariantType]: TWClassNames } = {
  filled: "text-white-80",
  outlined: "text-gray-400",
}
export const closeBtnColor: { [variant in ToastVariantType]: TWClassNames } = {
  filled: "text-white-100",
  outlined: "text-gray-500",
}
