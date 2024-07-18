 
import { Dimensions } from 'react-native';
const { width, height } = Dimensions.get('window');
import styled, { css } from 'styled-components/native';

export const Container = styled.View`
  height: 100%;
  padding: 80px 24px 56px 24px;
  display: flex;

  justify-content: space-between;
`;

export const ImageLogo = styled.Image`
  width: 200px;
  height: 80px;
  margin: 0 auto;
  resize-mode: contain;
`;

export const FormHeader = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

export const Main = styled.View`
  margin-top: 0px;
  ${width <= 375 && css`
    margin-top: -10%;
  `}
`;

export const WelcomeText = styled.Text`
  color: ${({ theme }) => theme.colors.textPrimary};
  margin-bottom: 20px;
  font-size: 16px;
`;

export const Footer = styled.View`
  margin-top: 24px;
  justify-content: space-between;
  flex-direction: row-reverse;
`;

export const ForgetPassword = styled.Text`
  color: ${({ theme }) => theme.colors.backgroundButton};
  font-size: 14px;
`;

export const ChangeAccount = styled.Text`
  color: ${({ theme }) => theme.colors.backgroundButton};
  font-size: 14px;
`;