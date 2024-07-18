import { useRef, useEffect, useCallback } from "react";
import { TextInputProps, TextInput as TextInputREACT } from "react-native";

import { Feather } from "@expo/vector-icons";
import { useField } from "@unform/core";

import { useAuth } from "../../../hooks/auth";
import { useTheme } from "../../../hooks/theme";
import {
  Container,
  InputContainer,
  TextInput,
  Error,
  UserIcon,
  InputLabel,
} from "./styles";

interface IInputProps extends TextInputProps {
  name: string;
  label: string;
  iconRight?: keyof typeof Feather.glyphMap;
  iconRightFunction?: () => void;
  placeHolder?: string;
}

interface IInputReference extends TextInputREACT {
  value: string;
}

export default function InputWithLabel({
  name,
  label,
  onChangeText,
  iconRight,
  iconRightFunction,
  placeHolder = "",
  ...rest
}: IInputProps) {
  const inputRef = useRef<IInputReference>(null);

  const { user } = useAuth();

  const { fieldName, registerField, defaultValue = "", error } = useField(name);

  const { theme } = useTheme();

  useEffect(() => {
    if (inputRef.current) inputRef.current.value = defaultValue;
  }, [defaultValue]);

  useEffect(() => {
    registerField<string>({
      name: fieldName,
      ref: inputRef.current,
      getValue() {
        if (inputRef.current) {
          const { value } = inputRef.current;

          return value;
        }

        return "";
      },
      setValue(ref, value) {
        if (inputRef.current) {
          // inputRef.current.setNativeProps({ text: value });
          inputRef.current.value = value;
        }
      },
      clearValue() {
        if (inputRef.current) {
          // inputRef.current.setNativeProps({ text: "" });
          inputRef.current.value = "";
        }
      },
    });
  }, [fieldName, registerField]);

  const handleChangeText = useCallback(
    (value: string) => {
      if (inputRef.current) inputRef.current.value = value;

      if (onChangeText) onChangeText(value);
    },
    [onChangeText],
  );

  return (
    <Container style={{ flex: 1 }}>
      <InputLabel>{label}</InputLabel>
      <InputContainer isErrored={!!error} isFocused={false}>
        {user.cpf && name === "cpf" && <UserIcon name="user" size={24} />}
        <TextInput
          ref={inputRef}
          onChangeText={handleChangeText}
          defaultValue={defaultValue}
          placeholder={placeHolder}
          placeholderTextColor={theme.colors.textPrimary}
          {...rest}
        />

        {iconRight && (
          <Feather
            name={iconRight}
            size={20}
            color={theme.colors.textPrimary}
            onPress={iconRightFunction}
          />
        )}
      </InputContainer>

      {error && <Error>{error}</Error>}
    </Container>
  );
}
