import styled from "styled-components";

const Button = styled.button`
  background-color: ${({ theme }) => theme.neutral.elements};
  color: ${({ theme }) => theme.neutral.text};
  border: none;
  outline: none;
  display: flex;
`;

export default Button;
