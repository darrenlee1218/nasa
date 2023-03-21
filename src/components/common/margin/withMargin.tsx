import React from 'react';
import styled from 'styled-components';

export interface WithMarginProps {
  margin?: string;
  children: React.ReactNode;
}

const OuterDiv = styled.div<Pick<WithMarginProps, 'margin'>>`
  margin: ${(props) => props.margin || 'auto'};
`;

const WithMargin = ({ margin, children }: WithMarginProps) => {
  return <OuterDiv margin={margin}>{children}</OuterDiv>;
};

export default WithMargin;
