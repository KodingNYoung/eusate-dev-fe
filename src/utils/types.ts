import { HTMLProps, PropsWithChildren, ReactElement } from "react";

export type TWClassNames = HTMLProps<HTMLElement>["className"];

export type TypographyVariants =
  | "regular-xxs"
  | "regular-xs"
  | "regular-sm"
  | "regular-base"
  | "regular-lg"
  | "regular-xl"
  | "regular-2xl"
  | "regular-3xl"
  | "regular-4xl"
  | "regular-5xl"
  | "medium-xxs"
  | "medium-xs"
  | "medium-sm"
  | "medium-base"
  | "medium-lg"
  | "medium-xl"
  | "medium-2xl"
  | "medium-3xl"
  | "medium-4xl"
  | "medium-5xl"
  | "semibold-xxs"
  | "semibold-xs"
  | "semibold-sm"
  | "semibold-base"
  | "semibold-lg"
  | "semibold-xl"
  | "semibold-2xl"
  | "semibold-3xl"
  | "semibold-4xl"
  | "semibold-5xl"
  | "bold-xxs"
  | "bold-xs"
  | "bold-sm"
  | "bold-base"
  | "bold-lg"
  | "bold-xl"
  | "bold-2xl"
  | "bold-3xl"
  | "bold-4xl"
  | "bold-5xl"
  | "bold-6xl"
  | "bold-7xl"
  | "bold-8xl"
  | "bold-9xl";

export type LogoVariants =
  | "icon-gradient"
  | "icon-white"
  | "icon-black"
  | "full-white"
  | "full-black"
  | "full-gradient-white"
  | "full-gradient-black";

export type FC<PropsType = {}> = {
  (
    props: { className?: TWClassNames } & PropsWithChildren<PropsType>, // These line automatically add `className` and `children` to all component using the `FC` type
    context?: unknown
  ): ReactElement | null;
  displayName?: string;
};
export type LayoutFC<
  ParamsType = { [paramsKey: string]: string | string[] | undefined }
> = {
  (props: PropsWithChildren<{ params?: ParamsType }>, context?: unknown):
    | ReactElement
    | null
    | Promise<ReactElement | null>;
  displayName?: string;
};

export type PageFC<
  ParamsType = { [paramsKey: string]: string | string[] | undefined },
  SearchParamsType = {
    [searchParamsKey: string]: string | string[] | undefined;
  }
> = {
  (
    props: {
      params?: ParamsType;
      searchParams?: SearchParamsType;
    },
    context?: unknown
  ): ReactElement | null | Promise<ReactElement | null>;
  displayName?: string;
};
