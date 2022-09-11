import React, { useMemo, useCallback } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import useSWR from "swr";

import { FaArrowLeft } from "react-icons/fa";
import Button from "../styled/NoStylesButton";

import Container from "../styled/Container.styled";
import { DetailedInfo } from "../interface/DetailedInfo";
import Loading from "../components/Loading";
import InfoRow from "../styled/InfoRow.styled";

const CountryDetails = () => {
  const { name } = useParams();

  let navigate = useNavigate();

  const { data, error } = useSWR(`https://restcountries.com/v3.1/name/${name}`);

  const { data: dataBorders, error: errorBorders } = useSWR(
    data && data[0]?.borders
      ? `https://restcountries.com/v3.1/alpha?codes=${data[0].borders.join(
          ","
        )}`
      : null
  );

  const prepareData = useCallback(
    (data: any, bordersArray: any[]): DetailedInfo => {
      let returnData: DetailedInfo = {} as DetailedInfo;

      if (!data) {
        return returnData;
      } else {
        const {
          flags,
          name,
          population,
          region,
          subregion,
          capital,
          tld,
          currencies,
          languages,
        } = data[0];

        return {
          name: name.common,
          flag: flags.svg,
          nativeName: (Object.values(name.nativeName)[0] as any).official ?? "",
          population: population,
          region,
          subregion,
          capital: capital[0],
          domain: tld[0],
          currencies: (
            Object.values(currencies) as { name: string; symbol: string }[]
          ).map((item: { name: string; symbol: string }) => item.name) ?? [""],
          languages: Object.values(languages),
          border: bordersArray
            ? bordersArray.length
              ? bordersArray?.map((item: any) => item.name.common)
              : []
            : [],
        };
      }
    },
    [data]
  );

  const preparedData = useMemo(
    () => prepareData(data, dataBorders),
    [name, data, dataBorders]
  );

  const loading = !data && !error && !dataBorders && !errorBorders;

  if (loading) {
    return <Loading />;
  }

  return (
    <Container>
      <BackButton
        onClick={() => {
          navigate(-1);
        }}
      >
        <FaArrowLeft />
        Back
      </BackButton>
      <Content>
        <StyledImage src={preparedData.flag} alt="" />

        <InfoWrapper>
          <Title>{preparedData.name}</Title>
          <DetailsInfoRow>
            <InfoColumn>
              <InfoRow fontSize="large">
                Native Name: <span>{preparedData.nativeName}</span>
              </InfoRow>
              <InfoRow fontSize="large">
                Population:{" "}
                <span>{preparedData.population.toLocaleString("en-US")}</span>
              </InfoRow>
              <InfoRow fontSize="large">
                Region: <span>{preparedData.region}</span>
              </InfoRow>
              <InfoRow fontSize="large">
                Sub Region: <span>{preparedData.subregion}</span>
              </InfoRow>
              <InfoRow fontSize="large">
                Capital: <span>{preparedData.capital}</span>
              </InfoRow>
            </InfoColumn>
            <InfoColumn>
              <InfoRow fontSize="large">
                Top Level Domain: <span>{preparedData.domain}</span>
              </InfoRow>
              <InfoRow fontSize="large">
                Currencies:{" "}
                <span>
                  {preparedData.currencies.length > 1
                    ? preparedData.currencies.join(", ")
                    : preparedData.currencies}
                </span>
              </InfoRow>
              <InfoRow fontSize="large">
                Languages:{" "}
                <span>
                  {preparedData.languages?.length > 1
                    ? preparedData.languages.join(", ")
                    : preparedData.languages ?? null}
                </span>
              </InfoRow>
            </InfoColumn>
          </DetailsInfoRow>
          {preparedData.border?.length ? (
            <TagGroup>
              <Title2>Border Countries:</Title2>
              {preparedData.border.map((item, index) => (
                <Tag to={`/country/${item}`} key={item + index}>
                  {item}
                </Tag>
              ))}
            </TagGroup>
          ) : null}
        </InfoWrapper>
      </Content>
    </Container>
  );
};

const Content = styled.div`
  margin-top: 4rem;
  width: 100%;
  display: grid;
  gap: 3rem;
  @media (min-width: 1024px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 4rem;
  }
`;
const TagGroup = styled.div`
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  align-items: center;
`;

const Tag = styled(Link)`
  font-weight: ${({ theme }) => theme.weights.light};
  font-size: ${({ theme }) => theme.fontSize.homepageItems};
  padding: 0.5rem 2rem;
  border-radius: 5px;
  display: flex;
  background-color: ${({ theme }) => theme.neutral.elements};
  box-shadow: ${({ theme }) => theme.boxShadow};
`;

const Title = styled.h1`
  font-size: 1.3rem;
  font-weight: ${({ theme }) => theme.weights.bold};
  margin-bottom: 2rem;

  @media (min-width: 767px) {
    font-size: 1.6rem;
  }
`;

const Title2 = styled(Title)`
  font-size: 1.1rem;
  margin-bottom: 0;
`;

const InfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const StyledImage = styled.img`
  width: 100%;
  margin: 0 auto;

  @media (min-width: 767px) {
    width: 70%;
    margin: 0;
  }

  @media (min-width: 1024px) {
    margin: 0 auto;
    width: 100%;
  }
`;

const InfoColumn = styled.div`
  flex-grow: 1;
  margin-bottom: 2rem;

  & > * {
    line-height: 2.3rem;
  }
`;

const DetailsInfoRow = styled.div`
  display: flex;
  flex-direction: column;

  @media (min-width: 1440px) {
    flex-direction: row;
  }
`;

const BackButton = styled(Button)`
  padding: 0.5rem 2rem;
  border-radius: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  font-weight: ${({ theme }) => theme.weights.light};
  box-shadow: ${({ theme }) => theme.boxShadow};
  cursor: pointer;
`;

export default CountryDetails;
