import Image from "next/image";
import React from "react";
import styled from "styled-components";
import { LOGO_DEFAULT_SIZE } from "constants/images";
import { Camera } from "react-feather";

interface LogoProps {
  height?: number;
  width?: number;
  boxShadowColor?: string;
  skipBlur?: boolean;
  light?: boolean;
}

const OuterLogoDiv = styled.div<LogoProps>`
  height: ${(props) => props.height}px;
  width: ${(props) => props.width}px;
  border-radius: 50%;
  ${(props) =>
    props.boxShadowColor
      ? `box-shadow: 0 0px ${
          0.1 * (props.height || LOGO_DEFAULT_SIZE.height)
        }px 0px ${props.boxShadowColor};`
      : ""}
  ${(props) => (props.skipBlur ? `` : "backdrop-filter: blur(4px);")}
  z-index: 1000;

  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

const Logo = ({
  height = LOGO_DEFAULT_SIZE.height,
  width = LOGO_DEFAULT_SIZE.width,
  light,
  ...rest
}: LogoProps) => {
  return (
    <OuterLogoDiv
      height={height}
      width={width}
      skipBlur={rest.skipBlur}
      {...rest}
    >
      <Camera size={20} />
    </OuterLogoDiv>
  );
};

export default Logo;
