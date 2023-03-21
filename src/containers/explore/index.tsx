import { useState } from "react";
import SearchInput from "components/common/input/search";
import Container from "components/container";
import {
  ExpectedNasaMediaQuerySearchResponse,
  useLazyNasaMediaSearch,
  useNasaMediaSearch,
} from "utils/data/useNasaMediaLibrary";
import NasaMediaList from "components/nasa/nasaMediaList";
import Loader, { LoaderType } from "components/common/loaders";
import YearInput from "components/common/input/date/year";
import styled from "styled-components";
import { NASA_API_SEARCH_MOCK_DATA } from "e2e/data/nasa";
import SimpleButton from "components/common/button/simple";
import { theme } from "utils/theme";
import Body from "components/common/body";

const YearRangeFilterDiv = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
`;

interface SearchFiltersProps {
  setSearchInput: (input: string) => void;
  setFromYear: (input: Date | undefined) => void;
  setToYear: (input: Date | undefined) => void;
}

const SearchFilters = ({
  setSearchInput,
  setFromYear,
  setToYear,
}: SearchFiltersProps) => {
  return (
    <>
      <SearchInput
        search={{ title: "NASA library" }}
        onChange={setSearchInput}
      />
      <YearRangeFilterDiv>
        <YearInput
          margin="0 20px 0 0"
          search={{ title: "From Year" }}
          onChange={(year) => {
            setFromYear(year.length ? new Date(year) : undefined);
          }}
        />
        <YearInput
          search={{ title: "To Year" }}
          onChange={(year) => {
            const endDate = new Date(year);
            // for year 2023 this sets the date to Jan 1st 2023; we want Dec 31st 2023 instead, so we'll advance one year
            endDate.setFullYear(endDate.getFullYear() + 1);
            setToYear(year.length ? endDate : undefined);
          }}
        />
      </YearRangeFilterDiv>
    </>
  );
};

const ExploreContainer = () => {
  const [searchInput, setSearchInput] = useState("");
  const [fromYear, setFromYear] = useState<Date | undefined>();
  const [toYear, setToYear] = useState<Date | undefined>();
  const { data, isLoading } = useNasaMediaSearch({
    searchInput,
    startDate: fromYear,
    endDate: toYear,
  });

  const filters = (
    <SearchFilters
      setFromYear={setFromYear}
      setSearchInput={setSearchInput}
      setToYear={setToYear}
    />
  );

  if (isLoading) {
    return (
      <Container centerContent py="20px" pylg="20px">
        {filters}
        <Loader type={LoaderType.BAR} width="120px" />
      </Container>
    );
  }

  return (
    <Container centerContent py="20px" pylg="20px">
      {filters}
      <NasaMediaList items={data?.collection.items || []} />
    </Container>
  );
};

export const LazyExploreContainer = () => {
  const [searchInput, setSearchInput] = useState("");
  const [fromYear, setFromYear] = useState<Date | undefined>();
  const [toYear, setToYear] = useState<Date | undefined>();
  const [data, setData] = useState<
    ExpectedNasaMediaQuerySearchResponse | undefined
  >();
  const [isLoading, setIsLoading] = useState(false);
  // const { data, isLoading } = useNasaMediaSearch({
  //   searchInput,
  //   startDate: fromYear,
  //   endDate: toYear,
  // });

  const { fetch, query } = useLazyNasaMediaSearch({
    searchInput,
    endDate: toYear,
    startDate: fromYear,
  });

  const filters = (
    <SearchFilters
      setFromYear={setFromYear}
      setSearchInput={setSearchInput}
      setToYear={setToYear}
    />
  );

  const searchButton = (
    <SimpleButton
      width="100%"
      backgroundColor={theme.colors.gray500}
      onClick={async () => {
        setIsLoading(true);
        const { data } = await fetch();
        setIsLoading(false);
        setData(data);
      }}
    >
      <Body color={theme.colors.white}>Search</Body>
    </SimpleButton>
  );

  if (isLoading) {
    return (
      <Container centerContent py="20px" pylg="20px">
        {filters}
        {searchButton}
        <Loader type={LoaderType.BAR} width="120px" />
      </Container>
    );
  }

  if (!data) {
    return (
      <Container centerContent py="20px" pylg="20px">
        {filters}
        {searchButton}
      </Container>
    );
  }

  return (
    <Container centerContent py="20px" pylg="20px">
      {filters}
      {searchButton}
      <NasaMediaList items={data?.collection.items || []} />
    </Container>
  );
};

export default ExploreContainer;
