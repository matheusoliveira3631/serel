import styled from "styled-components/native";

export const Container = styled.View`
  margin-top: 24px;
  gap: 16px;
`;

export const SelectEnrollment = styled.TouchableOpacity`
  margin-top: 16px;
  margin-left: auto;
  padding: 8px 12px;

  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 8px;

  background-color: ${({ theme }) => theme.colors.secondary};
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

export const ValuesItem = styled.View``;

export const DivisorList = styled.View`
  height: 36px;
  width: 2px;
  background-color: ${({ theme }) => theme.colors.textPrimary};
  margin: 0 16px;
`;

export const ValuesText = styled.Text`
  color: ${({ theme }) => theme.colors.textPrimary};
  font-size: 14px;
  font-weight: bold;
`;
export const ValuesLabel = styled.Text`
  color: ${({ theme }) => theme.colors.textPrimary};
  font-size: 10px;
  text-transform: uppercase;
`;

// CHILDREN COMPONENTS
export const ViewTitle = styled.View`
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  justify-content: flex-start;
  gap: 8px;
  margin-top: 24px;
`;

export const ViewTitleText = styled.Text`
  font-size: 14px;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.textPrimary};
`;
