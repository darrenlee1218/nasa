import _ from "lodash";
import { useRef } from "react";
import { Calendar, Search as SearchIcon, X } from "react-feather";
import styled from "styled-components";
import EmptyButton from "components/common/button/empty";
import { SEARCH_DELAY_MS } from "constants/search";
import { getFontCss, theme } from "utils/theme";

const SearchInputDiv = styled.div<{ margin?: string }>`
  width: 100%;
  margin: ${(props) => props.margin || `0 0 20px 0`};
`;

const SearchIconBox = styled.span``;

const SearchWrapper = styled.div`
  flex: 1;
  position: relative;

  /* border: 1px solid ${theme.colors.gray300}; */
  border-radius: 10px;

  & svg {
    height: 20px;
    width: 20px;

    pointer-events: none;
    stroke: ${(props) => props.theme.colors.gray300};
  }

  &:focus-within {
    border-color: ${theme.colors.gray500};
  }

  & > ${SearchIconBox} {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 8px;
    height: 20px;
    width: 20px;
    margin: auto 0;
  }

  & > ${EmptyButton} {
    position: absolute;
    top: 0;
    bottom: 0;
    right: 8px;
    height: 20px;
    width: 20px;
    margin: auto 0;
  }
`;

const CustomInput = styled.input`
  border: 1px solid ${theme.colors.gray300};
  border-radius: 10px;
  width: 100%;
  ${getFontCss({})}
  padding: 10px 36px 10px 36px;
  display: flex;

  &:focus {
    outline: none;
    border-color: ${theme.colors.gray500};
  }
`;

interface SearchProps {
  search: { title: string; placeholder?: string; value?: string };
  onChange?: (value: string) => void;
  margin?: string;
}

const SearchInput = ({ search, onChange, margin }: SearchProps) => {
  const searchInput = useRef<HTMLInputElement>(null);

  const delaySearch = _.debounce((value: string) => {
    if (onChange) {
      onChange(value);
    }
  }, SEARCH_DELAY_MS);

  const handleSearch: JSX.IntrinsicElements["input"]["onChange"] = (evt) => {
    const { value } = evt.target;
    delaySearch(value);
  };

  const searchInputProps: JSX.IntrinsicElements["input"] = {
    onChange: handleSearch,
    placeholder: search?.placeholder || `${search.title}`,
  };

  const date = new Date();

  return (
    <SearchInputDiv margin={margin}>
      <SearchWrapper>
        <SearchIconBox>
          <Calendar color={theme.colors.black} />
        </SearchIconBox>
        <CustomInput
          {...searchInputProps}
          ref={searchInput}
          type="number"
          min="1900"
          max={date.getFullYear()}
          step="1"
        />
        <EmptyButton
          onClick={() => {
            if (searchInput.current) {
              searchInput.current.value = "";
              onChange?.("");
            }
          }}
        >
          <X />
        </EmptyButton>
      </SearchWrapper>
    </SearchInputDiv>
  );
};

export default SearchInput;
