import styled from "styled-components/native";

export const Container = styled.View`
  align-items: center;
  padding: 32px;
`;

export const Title = styled.Text`
  color: ${({ theme }) => theme.colors.textPrimary};
  font-weight: 700;
  font-size: 16px;
  line-height: 18px;
  margin-bottom: 8px;
  margin-right: auto;
`;

export const Description = styled.Text`
  color: ${({ theme }) => theme.colors.textPrimary};
  font-size: 14px;
  line-height: 16px;
  margin-right: auto;
  margin-bottom: 16px;
`;

export const ItemContainer = styled.TouchableOpacity`
  background-color: ${({ theme }) => theme.colors.primary};
  border-radius: 16px;
`;

export const ItemTitle = styled.Text`
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: 12px;
  font-weight: 900;
  line-height: 18px;
  margin: 8px 16px;
`;

export const ItemContent = styled.View`
  background-color: ${({ theme }) => theme.colors.card};
  border-radius: 16px;
  padding: 16px;

  flex-direction: row;
  flex-wrap: wrap;
  gap: 8px;
`;

export const ViewItemEnrollment = styled.View``;

export const LabelItemEnrollment = styled.Text`
  color: ${({ theme }) => theme.colors.textPrimary};
  font-size: 10px;
  font-weight: bold;
  line-height: 10px;
`;

export const TitleItemEnrollment = styled.Text`
  color: ${({ theme }) => theme.colors.textPrimary};
  font-size: 24px;
  line-height: 24px;

  font-weight: bold;
`;

export const ViewItemSituation = styled.View`
  display: flex;
  align-items: flex-end;
  margin-left: auto;
  gap: 8px;
`;

export const LabelItemSituation = styled.Text`
  color: ${({ theme }) => theme.colors.textPrimary};
  font-size: 12px;
  line-height: 12px;

  font-weight: bold;
`;

export const TitleItemSituation = styled.Text`
  color: ${({ theme }) => theme.colors.textPrimary};
  font-size: 12px;
  line-height: 12px;
`;

export const ViewLineItem = styled.View`
  flex-direction: row;
  gap: 8px;
`;
