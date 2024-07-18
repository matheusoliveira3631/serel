import styled from "styled-components/native";

export const ViewContent = styled.View``;

export const CollapseTitleView = styled.TouchableOpacity`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 16px;
  width: 100%;

  margin-top: 24px;
  margin-bottom: 24px;
`;

export const CollapseTitle = styled.Text`
  color: ${({ theme }) => theme.colors.textPrimary};

  font-size: 12px;
  font-weight: bold;
  line-height: 18px;
  text-transform: uppercase;
`;
