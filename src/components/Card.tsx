import React, { useContext } from "react";
import styled from "styled-components";

import { CardData } from "../interface/CardData";

import { LazyLoadImage } from "react-lazy-load-image-component";
import { Link } from "react-router-dom";

import InfoRow from "../styled/InfoRow.styled";
import { ScrollContext } from "./CardGrid";

const Card = ({ capital, flag, name, population, region }: CardData) => {
  const scrollPosition = useContext(ScrollContext);

  return (
    <Link to={`/country/${name}`}>
      <StyledCard>
        <StyledCardImg
          alt={name}
          src={flag}
          effect="blur"
          scrollPosition={scrollPosition}
        />
        <StyledCardBody>
          <StyledCardTitle>{name}</StyledCardTitle>
          <InfoRow fontSize="small">
            Population: <span>{population.toLocaleString("en-US")}</span>
          </InfoRow>
          <InfoRow fontSize="small">
            Region: <span>{region}</span>
          </InfoRow>
          <InfoRow fontSize="small">
            Capital: <span>{capital}</span>
          </InfoRow>
        </StyledCardBody>
      </StyledCard>
    </Link>
  );
};

const StyledLink = styled(Link)`
  
`;

const StyledCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: space-between;
  justify-content: space-between;
  margin: 0 auto;
  border-radius: 5px;
  max-width: 270px;
  overflow: hidden;
  box-shadow: ${({ theme }) => theme.boxShadow};
  background-color: ${({ theme }) => theme.neutral.elements};

  @media (min-width: 767px) {
    max-width: 100%;
  }
`;

const StyledCardImg = styled(LazyLoadImage)`
  object-fit: cover;
  width: 100%;
  aspect-ratio: 3/2;
`;

const StyledCardBody = styled.div`
  padding: 3rem 2rem;
`;

const StyledCardTitle = styled.div`
  font-weight: ${({ theme }) => theme.weights.bold};
  margin-bottom: 1rem;
`;

export default Card;
