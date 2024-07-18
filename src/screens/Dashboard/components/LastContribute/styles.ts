import styled from "styled-components/native";

export const ViewLastContribute = styled.View``;

export const Card = styled.View`
  margin-top: 16px;
  background-color: ${({ theme }) => theme.colors.card};
  border-radius: 16px;
  border: 2px solid ${({ theme }) => theme.colors.primary};
`;

export const Title = styled.Text`
  font-size: 12px;
  color: ${({ theme }) => theme.colors.textPrimary};
  text-align: center;
  margin: 16px 16px 4px 16px;
  line-height: 18px;
`;

export const Item = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin: 4px 16px;
`;

export const Total = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  background-color: ${({ theme }) => theme.colors.primary};
  padding: 16px;
  margin: 12px 0 0 0;
  border-bottom-right-radius: 12px;
  border-bottom-left-radius: 12px;
`;

export const TextSmall = styled.Text`
  font-size: 12px;
  color: ${({ theme }) => theme.colors.textPrimary};
  line-height: 18px;
`;

export const TextMedium = styled.Text`
  font-size: 16px;
  color: ${({ theme }) => theme.colors.textPrimary};
  line-height: 18px;
`;
