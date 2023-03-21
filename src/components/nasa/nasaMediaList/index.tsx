import styled from "styled-components";
import { ExpectedNasaMediaQuerySearchResponse } from "utils/data/useNasaMediaLibrary";
import NasaMediaListItem from "../nasaMediaListItem";
import Heading from "components/common/heading";

const UL = styled.div`
  margin-top: 16px;
  margin-bottom: env(safe-area-inset-bottom);

  width: 100%;
`;

type NasaMediaListProps = {
  items: ExpectedNasaMediaQuerySearchResponse["collection"]["items"];
};

const NasaMediaList = ({ items }: NasaMediaListProps) => {
  if (!items.length) {
    return (
      <Heading margin="20px 0 0 0" level={400}>
        No items match your search
      </Heading>
    );
  }
  return (
    <UL>
      {items
        .filter((item) => item.data.length)
        .map((item) => (
          <NasaMediaListItem
            key={item.data[0].nasa_id} // because we filter above, [0] results in a valid object
            {...item}
          />
        ))}
    </UL>
  );
};

export default NasaMediaList;
