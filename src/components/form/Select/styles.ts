import { Feather } from "@expo/vector-icons";
import { Picker } from "@react-native-picker/picker";
import styled from "styled-components/native";

interface IInputContainerProps {
  isFocused: boolean;
  isErrored: boolean;
}

export const Container = styled.View`
  margin-bottom: 8px;
  border-bottom-width: 1px;
  border-color: ${({ theme }) => theme.colors.primary};
  padding: 0px 12px;
  /* max-height: 36px; */
`;

export const InputContainer = styled(Picker)<IInputContainerProps>`
  width: 100%;
  /* height: auto; */

  /* flex-direction: row; */
  /* align-items: center; */

  color: ${({ theme }) => theme.colors.textPrimary};
`;

export const InputLabel = styled.Text`
  color: ${({ theme }) => theme.colors.textPrimary};
  font-weight: bold;
  font-size: 12px;
`;

export const Error = styled.Text`
  margin-left: 8px;
  margin-bottom: 8px;
  color: ${({ theme }) => theme.colors.danger};
  font-size: 14px;
  height: 16px;
`;

export const UserIcon = styled(Feather)`
  margin-right: 8px;
  color: ${({ theme }) => theme.colors.textPrimary};
`;
