import React, { useCallback, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { FaAngleDown } from "react-icons/fa";

import SpaceBeetween from "../styled/SpaceBetween.styled";
import Button from "../styled/NoStylesButton";

type Props = {
  options: string[];
  value: number;
  setValue: (index: number) => void;
};

const CustomSelect = ({ options, value, setValue }: Props) => {
  const [show, setShow] = useState<boolean>(false);
  const selectRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const closeIfOutsideClick = (e: MouseEvent) => {
      if (!selectRef.current?.contains(e.target as Node)) {
        setShow(false);
      }
    };
    window.addEventListener("click", closeIfOutsideClick);
    return () => {
      window.removeEventListener("click", closeIfOutsideClick);
    };
  }, []);

  const handleChange = useCallback((index: number) => {
    setValue(index);
    setShow(false);
  }, []);

  return (
    <StyledSelectWrapper ref={selectRef}>
      <StyledSelectButton
        onClick={() => {
          setShow((prev) => !prev);
        }}
      >
        <SpaceBeetween>
          <span>
            {value === -1 || value === 0 ? "Filter By Region" : options[value]}
          </span>
          <FaAngleDown />
        </SpaceBeetween>
      </StyledSelectButton>
      <StyledSelectOptions show={show}>
        {options.map((item: string, index: number) => (
          <StyledSelectLi
            key={item + index}
            onClick={() => {
              handleChange(index);
            }}
          >
            {item}
          </StyledSelectLi>
        ))}
      </StyledSelectOptions>
    </StyledSelectWrapper>
  );
};

const StyledSelectWrapper = styled.div`
  width: 230px;
  position: relative;
`;

const StyledSelectButton = styled(Button)`
  color: ${({ theme }) => theme.neutral.text};
  padding: 1.25rem 2rem;
  display: flex;
  width: 100%;
  border-radius: 5px;
  cursor: pointer;
  box-shadow: ${({ theme }) => theme.boxShadow};
  font-weight: ${({ theme }) => theme.weights.bold};

  svg {
    width: 1.1rem;
    height: 1.1rem;
  }
`;

const StyledSelectOptions = styled.ul<{ show: boolean }>`
  width: 100%;
  background: ${({ theme }) => theme.neutral.elements};
  padding: 1.25rem 2rem;
  position: absolute;
  top: 110%;
  border-radius: 5px;
  display: ${(props) => (props.show ? "block" : "none")};
  box-shadow: ${({ theme }) => theme.boxShadow};
`;

const StyledSelectLi = styled.li<{ active?: boolean }>`
  list-style: none;
  padding: 0.25rem 0;
  margin: 0.5rem 0;
  font-size: ${({ theme }) => theme.fontSize.homepageItems};
  cursor: pointer;
`;

export default CustomSelect;
