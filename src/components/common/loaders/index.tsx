import BarLoader from 'react-spinners/BarLoader';
import PacmanLoader from 'react-spinners/PacmanLoader';
import styled from 'styled-components';
import { theme } from 'utils/theme';

interface LoaderDivProps {
  margin?: string;
}

export const LoaderDiv = styled.div<LoaderDivProps>`
  display: flex;
  width: '100%';
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin: ${(props) => (props.margin ? `${props.margin};` : '100px 100px;')};
`;

export enum LoaderType {
  BAR,
  PACMAN,
}

interface LoaderProps {
  width?: string;
  size?: string;
  type: LoaderType;
}

const Loader = ({ type, width, size, margin }: LoaderProps & LoaderDivProps) => (
  <LoaderDiv margin={margin}>
    {type === LoaderType.PACMAN && (
      <PacmanLoader color={theme.colors.gray500} loading size={size} />
    )}
    {type === LoaderType.BAR && (
      <BarLoader color={theme.colors.gray500} height="4px" loading width={width} />
    )}
  </LoaderDiv>
);

export default Loader;
