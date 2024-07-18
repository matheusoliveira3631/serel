import styled, { css } from "styled-components/native";
import { Entypo } from "@expo/vector-icons";

export const Container = styled.View`
  align-items: center;
`;

export const FingerIcon = styled(Entypo)`
  color: ${({ theme }) => theme.colors.backgroundButton};
  margin-bottom: 8px;
`;

export const BiometricDescription = styled.Text`
  width: 50%;
  text-align: center;
  font-size: 14px;
`;
