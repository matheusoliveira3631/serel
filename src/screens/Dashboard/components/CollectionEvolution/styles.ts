import styled from "styled-components/native";

export const ViewCollectionEvolution = styled.View`
  flex: 1;
`;

export const Card = styled.View`
  flex: 1;
  margin-top: 16px;
  background-color: ${({ theme }) => theme.colors.card};
  border-radius: 16px;
  margin-bottom: 40px;
  padding: 24px 32px;
`;

export const ChartsContainer = styled.View`
  display: flex;
  flex: 1;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 32px;
`;

export const ContainerChartBar = styled.View`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
`;

export const ViewChartBar = styled.View`
  background-color: #00000048;
  width: 12px;
  height: 120px;
  border-radius: 16px;
  display: flex;
  justify-content: flex-end;
  overflow: hidden;
`;

export const ChartUsed = styled.View`
  background-color: ${({ theme }) => theme.colors.secondary};
  width: 100%;
  border-radius: 16px;
`;

export const ChartYear = styled.Text`
  color: ${({ theme }) => theme.colors.textPrimary};
  font-size: 12px;
`;

export const ButtonOpenSelectPeriod = styled.TouchableOpacity`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  justify-content: flex-end;
  gap: 8px;
`;

export const TextSelectPeriod = styled.Text`
  color: ${({ theme }) => theme.colors.textPrimary};
  text-transform: uppercase;
  font-size: 12px;
`;
