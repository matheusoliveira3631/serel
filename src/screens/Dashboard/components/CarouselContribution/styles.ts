import styled from "styled-components/native";

export const ContributionCard = styled.View`
  background-color: ${({ theme }) => theme.colors.primary};
  border-radius: 16px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  /* margin-right: 16px;
  margin-left: 16px; */

  /* width: 100%; */
  /* flex: 1; */
`;

export const Title = styled.Text`
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: 12px;
  font-weight: 900;
  margin: 12px;
  /* height: 32px; */
  flex-wrap: wrap;
`;

export const Label = styled.Text`
  color: ${({ theme }) => theme.colors.textPrimary};
  font-size: 12px;
  font-weight: bold;
`;

export const BalanceLabel = styled.Text`
  color: ${({ theme }) => theme.colors.textPrimary};
  font-size: 10px;
  font-weight: bold;
`;

export const Value = styled.Text`
  color: ${({ theme }) => theme.colors.textPrimary};
  font-size: 24px;
  font-weight: bold;
`;

export const Cents = styled.Text`
  color: ${({ theme }) => theme.colors.textPrimary};
  font-size: 16px;
  font-weight: bold;
  margin-left: -12px;
`;

export const Quota = styled.Text.attrs({
  numberOfLines: 1,
})`
  color: ${({ theme }) => theme.colors.textPrimary};
  font-size: 12px;
`;

export const DateText = styled.Text`
  color: ${({ theme }) => theme.colors.textPrimary};
  font-size: 12px;
  font-style: italic;
  margin-left: auto;
`;

export const InsideCard = styled.View`
  background-color: ${({ theme }) => theme.colors.card};
  border-radius: 16px;
  padding: 16px;
`;

export const ValueView = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 12px;
`;

export const Footer = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 8px;

  margin-top: 16px;
`;
