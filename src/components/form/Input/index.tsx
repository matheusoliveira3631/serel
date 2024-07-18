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
} from "./styles";

interface IInputProps extends TextInputProps {
  name: string;
  label: string;
  maskType?: boolean;
  iconRight?: keyof typeof Feather.glyphMap;
  iconRightFunction?: () => void;
}

interface IInputReference extends TextInputREACT {
  value: string;
}

export default function Input({
  name,
  label,
  maskType,
  onChangeText,
  iconRight,
  iconRightFunction,
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
          let { value } = inputRef.current;
          if (maskType) {
            value = value.replace("-", "");
            value = value.replace(/\./g, "");
          }

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
  }, [fieldName, registerField, maskType]);

  const handleChangeText = useCallback(
    (value: string) => {
      if (inputRef.current) inputRef.current.value = value;

      if (onChangeText) onChangeText(value);
    },
    [onChangeText],
  );

  return (
    <Container>
      <InputContainer isErrored={!!error} isFocused={false}>
        {user.cpf && name === "cpf" && <UserIcon name="user" size={24} />}
        <TextInput
          ref={inputRef}
          onChangeText={handleChangeText}
          defaultValue={defaultValue}
          placeholderTextColor={theme.colors.textPrimary}
          placeholder={label}
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
