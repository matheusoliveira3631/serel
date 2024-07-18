import styled, { css } from "styled-components/native";
import { Feather } from "@expo/vector-icons";

interface InputContainerProps {
  isFocused: boolean;
  isErrored: boolean;
}

export const Container = styled.View`
  margin-bottom: 16px;
`;

export const InputContainer = styled.View<InputContainerProps>`
  width: 100%;
  height: 60px;
  padding: 0 16px;
  background: ${({ theme }) => theme.colors.input};
  border: 1px solid ${({ theme }) => theme.colors.inputBorder};

  border-radius: 10px;
  /* margin-bottom: 16px; */

  flex-direction: row;
  align-items: center;

  ${props =>
    props.isErrored &&
    css`
      border: 2px solid ${props.theme.colors.danger};
    `}

  ${props =>
    props.isFocused &&
    css`
      border: 1px solid #f99000;
    `}
`;

export const TextInput = styled.TextInput`
  flex: 1;
  color: ${({ theme }) => theme.colors.textPrimary};
  font-size: 16px;
`;

export const Error = styled.Text`
  margin-top: 4px;
  color: ${({ theme }) => theme.colors.danger};
  font-size: 14px;
`;

export const UserIcon = styled(Feather)`
  margin-right: 8px;
  color: ${({ theme }) => theme.colors.textPrimary};
`;
