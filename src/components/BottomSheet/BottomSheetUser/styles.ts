import styled from "styled-components/native";

export const ImageLogo = styled.Image`
  width: 200px;
  height: 40px;
  margin: 0 auto;
  resize-mode: contain;
`;

export const Header = styled.View`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin: 16px 24px 16px 24px;
  gap: 16px;
  height: auto;
`;

export const FirstBox = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  gap: 16px;
`;

export const ViewUserInfo = styled.View``;

export const UserName = styled.Text`
  font-size: 14px;
  color: ${({ theme }) => theme.colors.textPrimary};
  line-height: 21px;
`;

export const UserInscription = styled.Text`
  font-size: 12px;
  color: ${({ theme }) => theme.colors.textPrimary};
  line-height: 18px;
`;

export const ViewUserPlanInfo = styled.View`
  display: flex;
  justify-content: space-between;
  flex-direction: row;
`;

export const Divisor = styled.View`
  background-color: ${({ theme }) => theme.colors.textPrimary};
  opacity: 0.3;
  height: 2px;
`;

export const ViewButtons = styled.View`
  display: flex;
  gap: 16px;
  margin-top: 40px;
`;

export const ButtonItem = styled.TouchableOpacity`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: row;
  width: auto;
  margin: 0 24px 0 24px;
`;

export const ButtonText = styled.Text`
  font-size: 14px;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.textPrimary};
  text-transform: uppercase;
  text-align: left;
  width: 80%;
`;

export const Footer = styled.View`
  display: flex;
  align-items: center;
  width: 100%;
  margin: 48px auto -64px auto;
`;

export const ViewSignOut = styled.TouchableOpacity`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 8px;
`;

export const TextSignOut = styled.Text`
  color: ${({ theme }) => theme.colors.danger};
  font-size: 16px;
  font-weight: 500;
  line-height: 24px;
`;

export const TextAppVersion = styled.Text`
  margin: 16px auto 24px auto;
  font-size: 14px;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.textPrimary};
  line-height: 21px;
`;

export const ViewPoweredBy = styled.View`
  display: flex;
  flex-direction: row;
  gap: 8px;
`;

export const TextPoweredBy = styled.Text`
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.textPrimary};
`;

export const ImagePoweredBySerel = styled.Image`
  width: 64px;
  height: 20px;
`;
