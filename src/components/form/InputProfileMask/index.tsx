import { useRef, useEffect, useCallback, useMemo, useState } from "react";
import { MaskedTextInputProps } from "react-native-mask-text";

import { useField } from "@unform/core";

import { useTheme } from "../../../hooks/theme";
import {
  Container,
  InputContainer,
  TextInputMask,
  Error,
  InputLabel,
} from "./styles";

interface IInputProps extends Omit<MaskedTextInputProps, "onChangeText"> {
  name: string;
  label: string;
  maskType: "cep" | "cpf" | "cnpj" | "phone";

  containerStyle?: any;
  disabled?: boolean;

  onChangeText?: (text: string, rawText: string) => void;
}

export default function InputProfileMask({
  name,
  label,
  maskType,
  containerStyle,
  disabled,
  defaultValue,
  ...rest
}: IInputProps) {
  const { fieldName, registerField, error } = useField(name);
  const [inputValue, setInputValue] = useState("");

  const inputRef = useRef<any>(null);

  const { theme } = useTheme();

  const maskInput = useMemo(() => {
    let mask = "";

    switch (maskType) {
      case "cep":
        mask = "99999-999";

        break;

      case "cnpj":
        mask = "99.999.999/9999-99";

        break;

      case "cpf":
        mask = "999.999.999-99";

        break;

      case "phone":
        mask = "(99) 9 9999 9999";

        break;
      default:
        break;
    }

    return mask;
  }, [maskType]);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      getValue() {
        return inputValue;
      },
      // Precisa ver melhor como acessar a ref do input para alterar seu valor
      // setValue(_, value) {
      //   setInputValue(value);
      // },
      clearValue() {
        setInputValue("");
      },
    });
  }, [fieldName, registerField, inputValue]);

  const handleChangeText = useCallback((text: string, rawText: string) => {
    setInputValue(rawText);
  }, []);

  return (
    <>
      <Container
        {...containerStyle}
        style={
          disabled && {
            opacity: 0.4,
            borderColor: theme.colors.textPrimary,
          }
        }
      >
        <InputLabel>{label}</InputLabel>
        <InputContainer isErrored={!!error} isFocused={false}>
          <TextInputMask
            ref={inputRef}
            mask={maskInput}
            onChangeText={handleChangeText}
            defaultValue={defaultValue}
            // value={inputValue}
            editable={!disabled}
            placeholderTextColor={theme.colors.textPrimary}
            {...rest}
          />
        </InputContainer>
      </Container>
      {error && <Error>{error}</Error>}
    </>
  );
}
