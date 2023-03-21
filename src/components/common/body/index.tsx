import React from "react";
import styled, { css, FlattenSimpleInterpolation } from "styled-components";
import {
  FontProps,
  FontWeights,
  getFontCss,
  getFontWeights,
  theme,
} from "utils/theme";

type BodyTextProps = {
  margin?: string;
  size?: FlattenSimpleInterpolation;
  weight?: FlattenSimpleInterpolation;
  underline?: boolean;
  centered?: boolean;
  leftAlign?: boolean;
  clickable?: boolean;
  light?: boolean;
  fullWidth?: boolean;
} & FontProps;

const BodyText = styled.p<BodyTextProps>`
  ${(props) => getFontCss({ alternates: props.alternates })}
  font-weight: 300;
  font-size: 14px;
  line-height: 140%;
  letter-spacing: normal;
  margin: ${(props) => props.margin || "5px 0"};
  text-align: ${(props) => (props.leftAlign ? "left" : "justify")};

  ${(props) =>
    props.color &&
    css`
      color: ${props.theme.colors[props.color] || props.color};
    `}

  ${(props) => props.size}
  ${(props) => props.weight}
  
  ${(props) =>
    props.underline &&
    css`
      text-decoration: underline;
    `}


  ${(props) =>
    props.centered &&
    css`
      text-align: center;
    `}

  display: inline-block;

  ${(props) => (props.clickable ? "cursor: pointer;" : "")}
  ${(props) =>
    props.light && !props.color ? `color: ${theme.colors.white}` : ""}

  ${(props) => props.fullWidth && `width: 100%;`}
`;

type BodyProps = {
  margin?: string;
  color?: string;
  size?: "xsmall" | "small" | "regular";
  weight?: FontWeights;
  underline?: boolean;
  leftAlign?: boolean;
  centered?: boolean;
  onClick?: (e?: React.MouseEvent) => void;
  children: React.ReactNode;
  light?: boolean;
  it?: boolean;
  fullWidth?: boolean;
} & FontProps;

const Body: React.FC<BodyProps> = ({
  children,
  margin,
  color,
  size = "regular",
  weight = "regular",
  underline,
  leftAlign,
  centered,
  light,
  onClick,
  it,
  alternates,
  fullWidth,
}) => {
  const italicStyle = it
    ? css`
        font-style: italic;
        border-left: 3px ridge black;
        padding-left: 8px;
      `
    : "";

  const sizes = {
    xsmall: css`
      font-size: 12px;
      line-height: 12px;
    `,
    small: css`
      font-size: 14px;
      line-height: 140%;
    `,
    regular: css`
      font-size: 16px;
      line-height: 150%;
    `,
  };

  return (
    <BodyText
      color={color || theme.colors.black}
      margin={margin}
      size={sizes[size]}
      fullWidth={fullWidth}
      weight={css`
        font-weight: ${getFontWeights(weight)};
        ${italicStyle}
      `}
      leftAlign={leftAlign}
      underline={underline}
      centered={centered}
      clickable={onClick !== undefined}
      onClick={onClick}
      light={light}
      alternates={alternates}
    >
      {children}
    </BodyText>
  );
};

export default Body;
