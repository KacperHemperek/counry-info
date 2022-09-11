import React, { useCallback } from "react";
import styled from "styled-components";

const StyledInputWrapper = styled.div`
  background-color: ${({ theme }) => theme.neutral.elements};
  box-shadow: ${({ theme }) => theme.boxShadow};
  padding-left: 2rem;
  border-radius: 5px;
  display: flex;
  align-items: center;
  gap: 2rem;
  outline: none;
  width: 450px;
  max-width: 100%;
  height: min-content;
  overflow: hidden;
  caret-color: ${({ theme }) => theme.neutral.text};
  font-size: 1rem;

  &:focus-within {
    outline: 1px ${({ theme }) => theme.neutral.input} solid;
  }

  svg {
    fill: ${({ theme }) => theme.neutral.input};
    height: 1.2rem;
  }

  input:-webkit-autofill,
  input:-webkit-autofill:hover,
  input:-webkit-autofill:focus,
  input:-webkit-autofill:active {
    transition: background-color 50000000s ease-in-out 0s;
    -webkit-text-fill-color: ${({ theme }) => theme.neutral.text};
  }
`;

const StyledInput = styled.input`
  background-color: ${({ theme }) => theme.neutral.elements};
  border: none;
  outline: none;
  color: ${({ theme }) => theme.neutral.text};
  flex-grow: 1;
  padding: 1.25rem 0;

  &::placeholder {
    color: ${({ theme }) => theme.neutral.input};
  }
`;

const Icon = styled.div`
  display: flex;
`;

type Props = {
  placeholder?: string;
};

const SearchField = React.forwardRef<HTMLInputElement, Props>(
  ({ placeholder = "Search for a county..." }, ref) => {
    const focusOnInput = useCallback(() => {
      const search: HTMLInputElement | null = document.querySelector("#search");
      if (search) {
        search.focus();
      }
    }, []);

    return (
      <StyledInputWrapper onClick={focusOnInput}>
        <Icon>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
            <path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352c79.5 0 144-64.5 144-144s-64.5-144-144-144S64 128.5 64 208s64.5 144 144 144z" />
          </svg>
        </Icon>
        <StyledInput ref={ref} id="search" placeholder={placeholder} />
      </StyledInputWrapper>
    );
  }
);
export default SearchField;
