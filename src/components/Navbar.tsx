import React, { MouseEventHandler, useContext } from "react";
import styled from "styled-components";
import { FaRegMoon, FaMoon } from "react-icons/fa";

import { ThemeContext } from "../App";

import { Link } from "react-router-dom";

import Container from "../styled/Container.styled";
import SpaceBeetween from "../styled/SpaceBetween.styled";

const Navbar = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const isDarkMode = theme === "dark";
  return (
    <StyledNavbar>
      <Container>
        <SpaceBeetween>
          <Link to="/">
            <StyledNavbarTitle>Where in the world?</StyledNavbarTitle>{" "}
          </Link>
          <StyledNavbarToggle onClick={toggleTheme as MouseEventHandler}>
            {isDarkMode ? <FaMoon /> : <FaRegMoon />} Dark Mode
          </StyledNavbarToggle>
        </SpaceBeetween>
      </Container>
    </StyledNavbar>
  );
};

const StyledNavbar = styled.header`
  background-color: ${({ theme }) => theme.neutral.elements};
  font-size: ${({ theme }) => theme.fontSize.homepageItems};
  box-shadow: ${({ theme }) => theme.boxShadow} a {
    text-decoration: none;
  }
`;

const StyledNavbarTitle = styled.h1`
  font-size: ${({ theme }) => theme.fontSize.homepageItems};
  font-weight: ${({ theme }) => theme.weights.bold};

  color: ${({ theme }) => theme.neutral.text};
  @media (min-width: 426px) {
    font-size: 22px;
  }
`;

const StyledNavbarToggle = styled.button`
  background-color: ${({ theme }) => theme.neutral.elements};
  color: ${({ theme }) => theme.neutral.text};
  fill: ${({ theme }) => theme.neutral.text};
  border: none;
  cursor: pointer;
  display: flex;
  gap: 0.5rem;

  svg {
    width: 1rem;
    height: 1rem;
  }
`;

export default Navbar;
