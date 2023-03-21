import styled from 'styled-components';
import { theme } from 'utils/theme';

const EmptyButton = styled.button<{ margin?: string }>`
  margin: ${(props) => props.margin || '10px'};
  padding: 0;
  border: 0;
  background-color: inherit;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  color: black;

  &:disabled {
    & * {
      stroke: ${theme.colors.gray300};
    }
  }
`;

export default EmptyButton;
