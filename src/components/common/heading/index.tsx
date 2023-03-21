import React from 'react';
import styled, { css } from 'styled-components';
import { FontProps, getFontCss, theme } from 'utils/theme';

type StyledHeadingProps = {
  margin?: string;
  color?: string;
  centered?: boolean;
  light?: boolean;
  selected?: boolean;
  noWrap?: boolean;
} & FontProps;

const HBase = styled.p<StyledHeadingProps>`
  ${(props) => getFontCss({ alternates: props.alternates })}
  letter-spacing: -0.05em;
  margin: ${(props) => props.margin};
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  ${(props) => props.noWrap && 'white-space: nowrap;'}

  ${(props) =>
    props.centered &&
    css`
      text-align: center;
    `}

  ${(props) =>
    props.light && !props.color ? `color: ${theme.colors.white};` : `color: ${theme.colors.black};`}
  ${(props) =>
    props.selected &&
    `
      border-bottom: 1px solid ${theme.colors.gray900};
      padding-bottom: 3px;
      padding-top:4px;
    `} // padding so the border does not overlap with the text; padding-top to keep the text at the same level
  ${(props) =>
    props.color &&
    css`
      color: ${props.color};
    `}
`;

const H100 = styled(HBase)`
  font-weight: 500;
  font-size: 42px;
  line-height: 39px;
`;

const H200 = styled(HBase)`
  font-weight: 500;
  font-size: 30px;
  line-height: 36px;
`;

const H300 = styled(HBase)`
  font-weight: 400;
  font-size: 26px;
  line-height: 32px;
`;

const H400 = styled(HBase)`
  font-weight: 400;
  font-size: 22px;
  line-height: 26px;
`;

type HeadingProps = {
  level?: 100 | 200 | 300 | 400;
  onClick?: (e?: React.MouseEvent) => void;
  children: React.ReactNode;
} & StyledHeadingProps;

const Heading: React.FC<HeadingProps> = ({ children, level, ...rest }) => {
  switch (level) {
    case 100:
      return <H100 {...rest}>{children}</H100>;
    case 200:
      return <H200 {...rest}>{children}</H200>;
    case 300:
      return <H300 {...rest}>{children}</H300>;
    case 400:
      return <H400 {...rest}>{children}</H400>;
    default:
      return null;
  }
};

export default Heading;
