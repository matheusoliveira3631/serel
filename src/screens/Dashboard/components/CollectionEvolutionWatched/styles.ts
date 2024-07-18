import styled from "styled-components/native";

export const ViewCollectionEvolution = styled.View`
  flex: 1;
`;

export const Card = styled.View`
  flex: 1;
  margin-top: 16px;
  background-color: ${({ theme }) => theme.colors.card};
  border-radius: 16px;
  margin-bottom: 40px;
  padding: 24px 32px;
  /* overflow: scroll; */
`;
