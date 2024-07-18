import styled from "styled-components/native";

export const ViewContent = styled.View``;

export const CollapseTitleView = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 16px;
  margin-top: 24px;
  margin-bottom: 24px;
`;

export const FirstLineSkt = styled.View`
  height: 40px;
  width: 220px;
  background-color: ${({ theme }) => theme.colors.secondary};
  border-radius: 8px;
  overflow: hidden;
`;

export const SecondDivisor = styled.View`
  height: 2px;
  background-color: ${({ theme }) => theme.colors.secondary};
  margin: 8px 0;
  width: auto;
`;

export const ThirdDivisor = styled.View`
  height: 2px;
  background-color: ${({ theme }) => theme.colors.secondary};
  width: 45%;
`;

export const SeparateDivisor = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin: 8px 0;
`;

export const OthersLinesSkt = styled.View`
  height: 40px;
  width: auto;
  background-color: ${({ theme }) => theme.colors.secondary};
  border-radius: 8px;
  overflow: hidden;
`;
