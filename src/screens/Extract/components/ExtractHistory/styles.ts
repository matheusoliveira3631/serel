import styled, { DefaultTheme } from "styled-components/native";

export const ViewExtract = styled.View`
  margin-top: -32px;
  margin-bottom: 40px;
`;

export const Card = styled.View`
  margin-top: 16px;
  background-color: ${({ theme }) => theme.colors.secondary};
  border-radius: 16px;
  overflow: hidden;
`;

export const ViewItem = styled.View`
  padding: 16px;
  background-color: ${({ theme }) => theme.colors.secondary};
  gap: 8px;
`;

export const ViewForTwoItems = styled.View`
  flex-direction: row;

  justify-content: space-between;

  overflow: hidden;
  flex-wrap: wrap;
  gap: 8px;
`;

export const ViewLine = styled.View`
  flex-direction: row;
`;

function getTextColor(
  colorTheme: string,
  hasColorDiff: boolean,
  theme: DefaultTheme,
) {
  if (colorTheme === "light") {
    return hasColorDiff ? theme.colors.textSecondary : theme.colors.textPrimary;
  }

  return theme.colors.textSecondary;
}

export const Label = styled.Text<{
  hasColorDiff?: boolean;
}>`
  font-size: 14px;
  font-weight: bold;
  color: ${({ theme, hasColorDiff = false }) =>
    getTextColor(theme.title, hasColorDiff, theme)};
  line-height: 18px;
  margin-right: 8px;
`;

export const TextStyle = styled.Text<{
  hasColorDiff?: boolean;
}>`
  font-size: 14px;
  color: ${({ theme, hasColorDiff = false }) =>
    getTextColor(theme.title, hasColorDiff, theme)};
  line-height: 18px;
`;

export const EmptyExtractsContainer = styled.View`
  align-items: center;
  justify-content: center;
  flex: 1;
  background-color: transparent;
  gap: 16;
  margin-top: 32;
  margin-bottom: 32;
  margin-left: 16;
`;
