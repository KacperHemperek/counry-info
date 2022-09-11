import React from "react";
import { Bars } from "react-loader-spinner";
import styled, { useTheme } from "styled-components";

const Loading = () => {
  const theme = useTheme();

  return (
    <StyledLoading>
      <Bars color={theme.neutral.text} width={50} height={35} />
    </StyledLoading>
  );
};

const StyledLoading = styled.div`
  position: fixed;
  top: 50vh;
  left: 50vw;
  translate: -50% -50%;
  display: flex;
  padding: 1rem;
`;

export default Loading;
