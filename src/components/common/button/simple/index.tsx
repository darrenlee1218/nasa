import styled from 'styled-components';
import { theme } from 'utils/theme';

interface SimpleButtonProps {
  backgroundColor?: string;
  borderColor?: string;
  color?: string;
  width?: string;
  margin?: string;
  wrapWhiteSpace?: boolean;
}

const SimpleButton = styled.button<SimpleButtonProps>`
  margin: ${(props) => props.margin || '20px 0px'};
  padding: 8px 10px;
  border: none;
  background-color: ${(props) => props.backgroundColor || 'inherit'};
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  width: ${(props) => (props.width ? props.width : 'max-content')};
  ${(props) => (props.wrapWhiteSpace ? '' : 'white-space: nowrap;')}

  ${(props) => (props.borderColor ? `border: 1px solid ${props.borderColor};` : null)}

  &:hover {
    box-shadow: 0px 0px 10px -5px rgba(0, 0, 0, 0.3);
  }

  &:disabled {
    opacity: 0.8;

    &:hover {
      box-shadow: none;
    }
  }

  color: ${(props) => props.color || theme.colors.black}; // default color for the text
`;

export default SimpleButton;
