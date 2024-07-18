import styled from "styled-components/native";
import Button from "../../components/form/Button";

export const Container = styled.View`
  /* flex: 1; */
  height: 100%;
  display: flex;

  padding: 40px 24px 80px 24px;

  justify-content: space-between;
`;

export const ContentContainer = styled.View`
  gap: 32px;
`;

export const Title = styled.Text`
  color: ${({ theme }) => theme.colors.textPrimary};
  text-align: center;
  font-size: 30px;
`;

export const DescribeAction = styled.Text`
  color: ${({ theme }) => theme.colors.textPrimary};
  font-size: 14px;
  text-align: center;
  margin-bottom: 24px;
`;

export const HasRegistrationView = styled.View``;

export const HasRegistration = styled.Text`
  color: ${({ theme }) => theme.colors.textPrimary};
`;

export const LinkToLogin = styled(Button)`
  background-color: ${({ theme }) => theme.colors.backgroundButtonActions};
  height: 40px;
  font-size: 14px;
`;

export const EmailSended = styled.Text`
  font-weight: bold;
  color: ${({ theme }) => theme.colors.textPrimary};
  text-transform: uppercase;
  text-align: center;
  margin: 8px 0;
`;

export const LottieContainer = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;
