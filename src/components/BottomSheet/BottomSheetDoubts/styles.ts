import styled from "styled-components/native";

export const Container = styled.View`
  align-items: center;
  padding: 32px;
`;

export const Title = styled.Text`
  color: ${({ theme }) => theme.colors.textPrimary};
  font-weight: 700;
  font-size: 20px;
  margin-top: 24px;
  margin-bottom: 16px;
  text-align: center;
`;

export const ListItem = styled.View`
  margin: 8px 0;
`;

export const ListItemTitle = styled.Text`
  color: ${({ theme }) => theme.colors.textPrimary};
  font-weight: 700;
  font-size: 14px;
  line-height: 20px;
`;

export const ListItemDescription = styled.Text`
  color: ${({ theme }) => theme.colors.textPrimary};
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;
`;
