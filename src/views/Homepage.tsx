import React, {
  useCallback,
  useEffect,
  useMemo,
  useState,
  useRef,
} from "react";

import styled from "styled-components";

import useSWR from "swr";
import { CardData } from "../interface/CardData";

import CardGrid from "../components/CardGrid";
import CustomSelect from "../components/CustomSelect";
import SearchField from "../components/SearchField";
import Container from "../styled/Container.styled";

const MemoedGridCards = React.memo(CardGrid);

const Homepage = () => {
  const options: string[] = [
    "Globe",
    "Africa",
    "Americas",
    "Asia",
    "Europe",
    "Oceania",
  ];

  const [selectedRegion, setSelectedRegion] = useState<number>(-1);

  const selectedValue =
    selectedRegion === -1 || selectedRegion === 0
      ? ""
      : options[selectedRegion];

  const passSetRegion = useCallback((item: number) => {
    setSelectedRegion(item);
  }, []);

  const inputRef = useRef<HTMLInputElement | null>(null);
  const [searchValue, setSearchValue] = useState<string>("");

  useEffect(() => {
    const setSearchValuePass = () => {
      setSearchValue(inputRef.current?.value ?? "");
    };

    inputRef.current &&
      inputRef.current.addEventListener("keyup", setSearchValuePass);

    return () => {
      inputRef.current &&
        inputRef.current.removeEventListener("keyup", setSearchValuePass);
    };
  }, []);

  const { data, error } = useSWR("https://restcountries.com/v3.1/all");

  const updateFilteredValues = useCallback(
    (searchValue: string, selectValue: string, data: any[]): CardData[] => {
      if (!data) {
        return [];
      }

      let mutatedData: CardData[] = [];
      if (searchValue === "" && selectValue === "") {
        mutatedData = data.map((item) => {
          return {
            capital: item.capital,
            flag: item.flags.svg,
            name: item.name.common,
            population: item.population,
            region: item.region,
          } as CardData;
        }) as CardData[];
      } else {
        mutatedData = data
          .filter(
            (item: any) =>
              item.name.common
                .toLowerCase()
                .includes(searchValue.toLowerCase()) &&
              item.region.toLowerCase().includes(selectValue.toLowerCase())
          )
          .map((item: any) => ({
            capital: item.capital,
            flag: item.flags.svg,
            name: item.name.common,
            population: item.population,
            region: item.region,
          }));
      }
      return mutatedData;
    },
    []
  );

  const filteredValues = useMemo<CardData[]>(
    () => updateFilteredValues(searchValue, selectedValue, data),
    [searchValue, selectedValue, data]
  );

  return (
    <Container>
      <StyledFormWrapper>
        <SearchField ref={inputRef} />
        <CustomSelect
          options={options}
          setValue={passSetRegion}
          value={selectedRegion}
        />
      </StyledFormWrapper>
      <MemoedGridCards array={filteredValues} loading={!error && !data} />
    </Container>
  );
};

const StyledFormWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  width: 100%;
  gap: 2rem;
`;

export default Homepage;
