import { Feather } from "@expo/vector-icons";
import styled, { css } from "styled-components/native";

interface IInputContainerProps {
  isFocused: boolean;
  isErrored: boolean;
}

export const Container = styled.View`
  margin-bottom: 8px;
  border-bottom-width: 1px;
  border-color: ${({ theme }) => theme.colors.textPrimary};
  padding: 8px 12px;
`;

export const InputContainer = styled.View<IInputContainerProps>`
  width: 100%;
  height: 37px;

  flex-direction: row;
  align-items: center;

  ${props =>
    props.isFocused &&
    css`
      border: 1px solid #f99000;
    `}
`;

export const InputLabel = styled.Text`
  color: ${({ theme }) => theme.colors.textPrimary};
  font-weight: bold;
  font-size: 12px;
`;

export const TextInput = styled.TextInput`
  color: ${({ theme }) => theme.colors.textPrimary};
  font-size: 14px;
  width: 100%;
`;

export const Error = styled.Text`
  margin-left: 8px;
  color: ${({ theme }) => theme.colors.danger};
  font-size: 14px;
`;

export const UserIcon = styled(Feather)`
  margin-right: 8px;
  color: ${({ theme }) => theme.colors.textPrimary};
`;
