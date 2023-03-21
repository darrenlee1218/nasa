import NextLink, { LinkProps as NextLinkProps } from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { getFontCssValue } from "utils/theme";

export type LinkProps = NextLinkProps &
  JSX.IntrinsicElements["a"] & {
    newTab?: boolean;
    stretchParent?: boolean;
    inline?: boolean;
  };

const Link: React.FC<LinkProps> = ({
  children,
  href,
  as,
  replace,
  inline,
  scroll,
  shallow,
  passHref,
  prefetch,
  locale,
  newTab,
  color = "#00000000", // 0 opacity to prevent override
  stretchParent,
  ...anchorProps
}) => {
  let { pathname } = useRouter();
  if (!pathname.endsWith("/")) {
    pathname += "/";
  }
  const isActive = pathname === href;

  const baseStyle = {
    color,
    fontFamily: getFontCssValue({}),
    width: "min-content",
    display: inline ? "inline-block" : undefined,
  };

  return (
    <NextLink
      href={href}
      as={as}
      replace={replace}
      scroll={scroll}
      shallow={shallow}
      passHref={passHref}
      prefetch={prefetch}
      locale={locale}
      target={newTab ? "_blank" : "_self"}
      aria-current={
        isActive ? anchorProps["aria-current"] || "page" : undefined
      }
      style={
        stretchParent
          ? { ...baseStyle, width: "100%", height: "100%" }
          : baseStyle
      }
    >
      {children}
    </NextLink>
  );
};

export default Link;
