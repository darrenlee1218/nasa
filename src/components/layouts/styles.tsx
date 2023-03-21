import { Property as CSSType } from 'csstype';
import styled from 'styled-components';
import { HEADER_HEIGHT } from 'constants/style';

interface HeaderProps {
  showBorder?: boolean;
  showBackgroundEffects?: boolean;
  margin?: string;
  position?: CSSType.Position;
}

export const Header = styled.header<HeaderProps>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px;
  width: 100%;
  ${(props) => (props.position ? `position: ${props.position};` : '')}
  top: 0;
  left: 0;
  height: ${HEADER_HEIGHT};
  z-index: 200; // this should be above any main block content

  ${(props) =>
    props.showBackgroundEffects
      ? `
      background: rgba(255, 255, 255, 0.5);
      backdrop-filter: blur(4px);
      `
      : ''}
`;

interface WrapperProps {
  justifyContent?: CSSType.JustifyContent;
}

export const Wrapper = styled.div<WrapperProps>`
  display: flex;
  flex-direction: column;
  justify-content: ${(props) => props.justifyContent || 'space-between'};
  height: 100vh;
  max-height: 100vh;
`;

export const Footer = styled.footer`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 20px;
  margin-top: 20px;

  & > *:not(:last-child) {
    margin-right: 8px;
  }
`;

interface HeaderContentContainerProps {
  position?: CSSType.Position;
  paddingTop?: CSSType.PaddingTop;
}

export const HeaderContentContainer = styled.div<HeaderContentContainerProps>`
  display: flex;
  flex-direction: column;
  align-items: center;

  ${(props) => (props.paddingTop ? `padding-top: ${props.paddingTop}` : '')};
  ${(props) => (props.position ? `position: ${props.position}` : '')};
`;

export const Nav = styled.nav`
  display: flex;
  align-items: center;
  overflow: scroll;

  & > *:not(:last-child) {
    margin-right: 24px;
  }
`;
