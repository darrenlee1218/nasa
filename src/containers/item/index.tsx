import Container from "components/container";
import { useNasaMediaSearch } from "utils/data/useNasaMediaLibrary";
import Loader, { LoaderType } from "components/common/loaders";
import styled from "styled-components";
import Heading from "components/common/heading";
import { ArrowLeft } from "react-feather";
import EmptyButton from "components/common/button/empty";
import { useStaticRouter } from "utils/useStaticRouter";
import NasaItemContainerContainer from "components/nasa/item";
import { EXPLORE_URL } from "constants/urls";

const BackButtonDiv = styled.div`
  width: 100%;
  display: flex;
`;

interface ItemContainerProps {
  nasaId: string;
}

const ItemContainer = ({ nasaId }: ItemContainerProps) => {
  const { data, isLoading, error } = useNasaMediaSearch({
    searchInput: undefined,
    nasaId,
  });
  const router = useStaticRouter();

  const backButton = (
    <BackButtonDiv>
      <EmptyButton
        onClick={() => {
          // router.back() also works, if the user comes from the explore page
          router.push(EXPLORE_URL);
        }}
      >
        <ArrowLeft />
      </EmptyButton>
    </BackButtonDiv>
  );

  if (isLoading) {
    return (
      <Container centerContent py="20px" pylg="20px">
        {backButton}
        <Loader type={LoaderType.BAR} width="120px" />
      </Container>
    );
  }

  if (!data || error || !data.collection.items?.[0]) {
    return (
      <Container centerContent py="20px" pylg="20px">
        {backButton}
        <Heading margin="20px 0 0 0" level={400}>
          Could not find this item
        </Heading>
      </Container>
    );
  }

  return (
    <Container centerContent py="20px" pylg="20px">
      {backButton}
      <NasaItemContainerContainer {...data.collection.items[0]} />
    </Container>
  );
};

export default ItemContainer;
