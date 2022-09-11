import React, { createContext } from "react";
import {
  LazyComponentProps,
  ScrollPosition,
  trackWindowScroll,
} from "react-lazy-load-image-component";
import { Bars } from "react-loader-spinner";
import styled, { useTheme } from "styled-components";
import { CardData } from "../interface/CardData";

import Card from "./Card";
import Loading from "./Loading";

interface CustomLazyProps extends LazyComponentProps {
  array: CardData[];
  loading: boolean;
}

export const ScrollContext = createContext<ScrollPosition>({ x: 0, y: 0 });

const CardGrid = ({ array, loading, scrollPosition }: CustomLazyProps) => {
  if (loading) {
    return <Loading />;
  }

  return (
    <ScrollContext.Provider value={scrollPosition}>
      <Grid>
        {array.length
          ? array.map((item, index) => (
              <Card key={item.name + index} {...item} />
            ))
          : null}
      </Grid>
    </ScrollContext.Provider>
  );
};

const Grid = styled.div`
  display: grid;
  margin: 3rem 0;
  grid-template-rows: repeat(auto-fill, minmax(0, 1fr));
  gap: 5rem;
  place-items: center;
  @media (min-width: 767px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  @media (min-width: 1024px) {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }

  @media (min-width: 1440px) {
    grid-template-columns: repeat(4, minmax(0, 1fr));
  }
`;

export default trackWindowScroll(CardGrid);
