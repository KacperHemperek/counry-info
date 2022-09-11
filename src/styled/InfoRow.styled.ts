import styled from "styled-components";

const InfoRow = styled.p<{ fontSize: "small" | "large" }>`
  font-weight: ${({ theme }) => theme.weights.base};
  font-size: ${({ theme, fontSize }) =>
    fontSize === "small"
      ? theme.fontSize.homepageItems
      : theme.fontSize.detailPage};
  line-height: 1.5rem;

  span {
    font-weight: ${({ theme }) => theme.weights.light};
  }
`;

export default InfoRow;
