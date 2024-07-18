import { Feather } from "@expo/vector-icons";
import styled, { css } from "styled-components/native";

interface IInputContainerProps {
  isFocused: boolean;
  isErrored: boolean;
}

export const Container = styled.View`
  margin-bottom: 16px;
`;

export const InputLabel = styled.Text`
  color: ${({ theme }) => theme.colors.textPrimary};
  font-weight: bold;
  font-size: 12px;
  margin-bottom: 4px;
`;

export const InputContainer = styled.View<IInputContainerProps>`
  width: 100%;
  height: 60px;
  padding: 0 16px;
  background: ${({ theme }) => theme.colors.secondary};
  border: 1px solid ${({ theme }) => theme.colors.secondary};

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
  /* font-family: "RobotoSlab-Regular"; */

  ${({ editable }) =>
    !editable &&
    css`
      opacity: 0.7;
    `}
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
