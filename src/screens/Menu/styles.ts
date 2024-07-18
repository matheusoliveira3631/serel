import styled from "styled-components/native";

export const ListButtons = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  margin-top: 24px;
  gap: 16px;
  align-items: center;
`;

export const ButtonsText = styled.Text.attrs({
  numberOfLines: 2,
})`
  font-size: 8px;
  font-weight: 500;
  line-height: 18px;
  color: ${({ theme }) => theme.colors.textSecondary};
  text-transform: uppercase;

  margin-top: 8px;
`;

export const MenuButtons = styled.TouchableOpacity`
  width: 100px;
  height: 100px;
  background-color: ${({ theme }) => theme.colors.backgroundButtonActions};

  padding: 16px;

  border-radius: 16px;

  border: 1px solid ${({ theme }) => theme.colors.secondary};
  /* margin: 0 8px 16px 8px; */
`;
