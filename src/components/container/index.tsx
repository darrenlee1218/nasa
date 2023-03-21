import { Property as CSSType } from 'csstype';
import { useInView } from 'react-intersection-observer';
import styled, { css } from 'styled-components';
import FadeIn from 'components/common/transitions/FadeIn';
import { mq } from 'utils/responsive';

interface ContainerInnerDivProps {
  py?: string;
  px?: string;
  pylg?: string;
  pxlg?: string;
  fullWidth?: boolean;
  centerContent?: boolean;
  flexDirection?: CSSType.FlexDirection;
}

const getContainerPadding = (props: ContainerInnerDivProps) => {
  return css`
    padding: ${props.py || 0} ${props.px || '16px'};

    ${mq.gtlg`
        padding: ${props.pylg || 0} ${props.pxlg || '16px'};
    `}
  `;
};

const getContainerWidth = ({ fullWidth }: ContainerInnerDivProps) => {
  if (fullWidth) {
    return css`
      width: 100%;
      min-width: 100%;
    `;
  }

  // Set the max-width width of the default content container below
  return css`
    width: 100%;
    max-width: 800px;
  `;
};

interface ContainerOuterDivProps {
  backgroundColor?: string;
  margin?: string;
  padding?: string;
}

const ContainerOuterDiv = styled.div<ContainerOuterDivProps>`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  ${(props) => (props.backgroundColor ? `background-color: ${props.backgroundColor};` : '')};
  margin: ${(props) => props.margin};
  padding: ${(props) => props.padding};
`;

const ContainerInnerDiv = styled.div<ContainerInnerDivProps>`
  ${getContainerPadding}
  ${getContainerWidth}
  display: flex;
  flex-direction: ${(props) => props.flexDirection || 'column'};
  flex-wrap: wrap;
  padding: auto;
  z-index: 100; // so it's above other background specific items, like the main page background image
  align-items: ${(props) => (props.centerContent ? 'center' : 'flex-start')};
`;

type ContainerProps = {
  children: React.ReactNode;
  withFadeIn?: boolean;
} & ContainerInnerDivProps &
  ContainerOuterDivProps;

const Container = ({ children, withFadeIn, ...rest }: ContainerProps) => {
  const { ref, inView } = useInView({ triggerOnce: true });

  return withFadeIn ? (
    <FadeIn inView={inView}>
      <ContainerOuterDiv {...rest} ref={ref}>
        <ContainerInnerDiv {...rest}>{children}</ContainerInnerDiv>
      </ContainerOuterDiv>
    </FadeIn>
  ) : (
    <ContainerOuterDiv {...rest}>
      <ContainerInnerDiv {...rest}>{children}</ContainerInnerDiv>
    </ContainerOuterDiv>
  );
};

export default Container;
