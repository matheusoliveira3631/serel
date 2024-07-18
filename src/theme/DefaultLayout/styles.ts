import styled from "styled-components/native";

export const ScrollView = styled.ScrollView`
  flex: 1;
`;

export const Container = styled.View`
  flex: 1;
`;

export const Wrapper = styled.View`
  flex: 1;
  padding: 40px 24px 0 24px;
`;

// GENERAL STYLES

export const Header = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  gap: 16px;
  margin-bottom: 24px;
`;

export const BackPage = styled.Text`
  color: ${({ theme }) => theme.colors.textPrimary};
  font-size: 14px;
  font-weight: 500;
  line-height: 21px;
  text-transform: uppercase;
`;

export const Divisor = styled.View`
  position: absolute;
  left: 0;
  top: 88px;

  height: 2px;
  background-color: ${({ theme }) => theme.colors.textPrimary};
  opacity: 0.3;
`;
