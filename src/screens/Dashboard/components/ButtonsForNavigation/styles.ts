import styled from "styled-components/native";

export const ViewButtons = styled.View`
  width: 100%;
  display: flex;
  flex-direction: row;
  gap: 16px;
  margin-top: 24px;
`;

export const ButtonItem = styled.TouchableOpacity`
  display: flex;
  align-items: center;
  gap: 8px;
  width: 64px;
  margin: 0 auto;
`;

export const ButtonText = styled.Text.attrs({
  numberOfLines: 2,
})`
  color: ${({ theme }) => theme.colors.textPrimary};
  text-align: center;
  font-size: 12px;
`;
