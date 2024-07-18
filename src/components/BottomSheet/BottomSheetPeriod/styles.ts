import styled from "styled-components/native";

export const Container = styled.View`
  align-items: center;
  padding: 32px;
`;

export const Title = styled.Text`
  font-size: 14px;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.textPrimary};
  text-align: left;
  width: 100%;
`;

export const ButtonItem = styled.TouchableOpacity`
  background-color: ${({ theme }) => theme.colors.backgroundButton};
  padding: 12px 16px;
  border-radius: 12px;
  width: 45%;
`;

export const ButtonText = styled.Text`
  font-size: 14px;
  line-height: 18px;
  color: ${({ theme }) => theme.colors.textSecondary};
`;

export const Description = styled.Text`
  font-size: 14px;
  line-height: 18px;
  color: ${({ theme }) => theme.colors.textPrimary};
  width: 100%;
  text-align: justify;

  margin-top: 16px;
`;
