import { cls } from "@/utils/helpers"
import { FC, TWClassNames, TypographyVariants } from "@/utils/types"
import { Skeleton } from "@heroui/react"
import { createElement, HTMLProps, ReactNode } from "react"

type Props = HTMLProps<HTMLHeadingElement & HTMLParagraphElement> & {
  variant?: TypographyVariants
  as?: keyof HTMLElementTagNameMap
  weight?: 400 | 500 | 600 | 700
  loading?: boolean
}

const weightProps = {
  400: "font-regular",
  500: "font-medium",
  600: "font-semi-bold",
  700: "font-bold",
}

const getElement = (
  element: keyof HTMLElementTagNameMap = "div",
  children: ReactNode,
  className: TWClassNames,
  props: HTMLProps<HTMLHeadingElement & HTMLParagraphElement>
) => {
  return createElement(
    element,
    { ...props, className: cls(className) },
    children
  )
}

const Typography: FC<Props> = ({
  as,
  variant = "regular-base",
  weight,
  children,
  className,
  loading,
  ...props
}) => {
  return (
    <Skeleton isLoaded={!loading} className={cls("rounded-sm", className)}>
      {getElement(
        as,
        children,
        cls("font-app", weight && weightProps[weight], className, variant),
        props
      )}
    </Skeleton>
  )
}

export default Typography
