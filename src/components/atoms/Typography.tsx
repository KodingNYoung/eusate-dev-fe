import { cls } from "@/utils/helpers";
import { FC, TWClassNames, TypographyVariants } from "@/utils/types";
import { createElement, HTMLProps, ReactNode } from "react";

type Props = HTMLProps<HTMLHeadingElement & HTMLParagraphElement> & {
  variant?: TypographyVariants;
  as?: keyof HTMLElementTagNameMap;
  weight?: 400 | 500 | 600 | 700;
};

const weightProps = {
  400: "font-regular",
  500: "font-medium",
  600: "font-semi-bold",
  700: "font-bold",
};

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
  );
};

const Typography: FC<Props> = ({
  as,
  variant = "regular-base",
  weight,
  children,
  className,
  ...props
}) => {
  return getElement(
    as,
    children,
    cls("font-app", weight && weightProps[weight], className, variant),
    props
  );
};

export default Typography;
