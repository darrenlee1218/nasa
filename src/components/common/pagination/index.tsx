import { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { useIsVisible } from 'react-is-visible';
import Body from '../body';

type DivProps = {
  maxHeight: string;
};

const LoadingDiv = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Div = styled.div<DivProps>`
  width: 100%;
  max-height: ${(props) => props.maxHeight};
`;

type PaginatedItemsProps = {
  maxHeight?: string;
  fetchMoreItems: () => void;
  fetchingMoreItems: boolean;
  hasMoreItems: boolean;
  children: React.ReactNode;
};

const PaginatedItems: React.FC<PaginatedItemsProps> = ({
  maxHeight = '100%',
  children,
  fetchMoreItems,
  fetchingMoreItems,
  hasMoreItems,
}) => {
  const fetchMoreItemsRef = useRef<HTMLDivElement | null>(null);
  const isVisible = useIsVisible(fetchMoreItemsRef);

  useEffect(() => {
    if (isVisible && hasMoreItems && !fetchingMoreItems) {
      fetchMoreItems();
    }
  }, [fetchMoreItems, fetchingMoreItems, hasMoreItems, isVisible]);

  return (
    <Div maxHeight={maxHeight}>
      {children}
      <div ref={fetchMoreItemsRef} />
      {isVisible &&
        hasMoreItems && ( // TODO: add loader
          <LoadingDiv>
            <Body color="gray600" margin="8px 0 8px 0">
              Loading&hellip;
            </Body>
          </LoadingDiv>
        )}
    </Div>
  );
};

export default PaginatedItems;
