import { TouchableOpacity } from "react-native";

import styled from "styled-components/native";

export const Container = styled(TouchableOpacity)`
  width: 100%;
  height: 60px;
  background: ${({ theme }) => theme.colors.backgroundButton};
  border-radius: 10px;

  margin-top: 8px;
  flex-direction: row;

  justify-content: center;
  align-items: center;
`;

export const ButtonText = styled.Text`
  /* font-family: "RobotoSlab-Medium"; */
  color: ${({ theme }) => theme.colors.textSecondary};
  font-weight: 700;
  font-size: 18px;
`;
