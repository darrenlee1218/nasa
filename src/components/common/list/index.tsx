import React from "react";
import styled from "styled-components";

const UL = styled.ul`
  li {
    margin-left: 20px; // so the bullet point is in the list box
    list-style-type: circle;
  }
`;
const OL = styled.ol`
  li {
    margin-left: 20px; // so the number is in the list box
    list-style-type: number;
  }
`;
export const LI = styled.li`
  width: 100%;
`;

export interface ListProps {
  numbered?: boolean;
  children: React.ReactNode[];
}

const List = ({ numbered, children }: ListProps) =>
  numbered ? <OL>{children}</OL> : <UL>{children}</UL>;

export default List;
