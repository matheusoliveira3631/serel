import styled from "styled-components/native";

export const ViewNeedHelp = styled.TouchableOpacity`
  background-color: ${({ theme }) => theme.colors.secondary};
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  gap: 16px;

  margin-top: auto;
  padding: 16px 24px;
`;

export const NeedHelpContent = styled.View`
  width: 60%;
`;

export const NeedHelpTitle = styled.Text`
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: 12px;
  font-weight: bold;
`;

export const NeedHelpDescription = styled.Text`
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: 12px;
`;
