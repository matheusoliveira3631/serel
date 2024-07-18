import styled from "styled-components/native";

export const Header = styled.View`
  flex: 1;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const UserInfo = styled.View``;

export const Welcome = styled.Text`
  color: ${({ theme }) => theme.colors.textPrimary};
  font-size: 14px;
`;

export const UserName = styled.Text`
  color: ${({ theme }) => theme.colors.textPrimary};
  font-size: 16px;
  font-weight: bold;
  max-width: 240px;
`;

export const ViewIcons = styled.View`
  display: flex;
  flex-direction: row;
  gap: 24px;
`;

export const SelectEnrollment = styled.TouchableOpacity`
  margin-top: 16px;
  margin-left: auto;
  margin-bottom: 16px;
  padding: 8px 12px;

  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 8px;

  background-color: ${({ theme }) => theme.colors.backgroundButtonActions};
  border-radius: 12px;
`;

export const SelectEnrollmentBold = styled.Text`
  font-size: 12px;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.textSecondary};
`;

export const SelectEnrollmentNumber = styled.Text`
  font-size: 12px;
  color: ${({ theme }) => theme.colors.textSecondary};
`;

// CHILDREN COMPONENTS
export const ViewTitle = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  gap: 8px;
  margin-top: 24px;
`;

export const ViewTitleText = styled.Text`
  font-size: 14px;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.textPrimary};
`;
