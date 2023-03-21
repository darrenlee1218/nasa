import React from 'react';
import styled from 'styled-components';

interface WithPaddingProps {
  padding: string;
  children: React.ReactNode;
}

const OuterDiv = styled.div<Pick<WithPaddingProps, 'padding'>>`
  padding: ${(props) => props.padding};
  width: 100%;
`;

const WithPadding = ({ padding, children }: WithPaddingProps) => {
  return <OuterDiv padding={padding}>{children}</OuterDiv>;
};

export default WithPadding;
