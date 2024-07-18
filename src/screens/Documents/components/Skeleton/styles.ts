/* eslint-disable import/prefer-default-export */
import styled from "styled-components/native";

export const FirstLineSkt = styled.View`
  height: 40px;
  width: 100%;
  background-color: ${({ theme }) => theme.colors.secondary};
  border-radius: 8px;
  margin-bottom: 16px;

  overflow: hidden;
`;
