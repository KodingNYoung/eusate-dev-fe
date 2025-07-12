import { cls } from "@/utils/helpers"
import { FC, TWClassNames, TypographyVariants } from "@/utils/types"
import { Skeleton } from "@nextui-org/react"
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
  return loading ? (
    <Skeleton isLoaded={false} className={cls("rounded-sm w-52", className)}>
      {getElement(
        as,
        children || "John doe", // Placeholder text for loading state
        cls("font-app", weight && weightProps[weight], className, variant),
        props
      )}
    </Skeleton>
  ) : (
    getElement(
      as,
      children,
      cls("font-app", weight && weightProps[weight], className, variant),
      props
    )
  )
}

export default Typography
