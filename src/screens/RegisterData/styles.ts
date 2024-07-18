import styled from "styled-components/native";

export const Container = styled.View`
  margin-top: 32px;
`;

export const CollapsibleItem = styled.View`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 16px;

  margin-bottom: 32px;
`;

export const CollapsibleTitle = styled.Text`
  font-size: 12px;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.textPrimary};
  line-height: 18px;
  text-transform: uppercase;
  flex: 1;
`;

// CHILDREN COMPONENTS
export const CollapseWithTwoItems = styled.View`
  display: flex;
  flex-direction: row;
`;
