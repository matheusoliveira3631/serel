import { useRef, useEffect, useState } from "react";
import { Platform } from "react-native";

import { Picker } from "@react-native-picker/picker";
import { useField } from "@unform/core";
import { useTheme } from "styled-components";

import { Container, Error, InputContainer, InputLabel } from "./styles";

type TPickerItem = {
  label: string;
  value: string;
};

interface ISelectProps {
  name: "idestado" | "idcidade";
  label: string;
  disabled?: boolean;
  data: TPickerItem[] | [] | undefined | null;
  handleChange?: (idUf: string) => Promise<void>;
  initialData: TPickerItem;
}

export default function Select({
  name,
  label,
  disabled,
  data,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  handleChange = async () => {},
  initialData,
}: ISelectProps) {
  const pickerRef = useRef();
  const theme = useTheme();

  const [selectedOption, setSelectedOption] = useState(initialData.value);

  const { fieldName, registerField, error } = useField(name);

  // useEffect(() => {
  //   if (pickerRef.current) pickerRef.current.value = defaultValue;
  // }, [defaultValue]);

  useEffect(() => {
    registerField<string>({
      name: fieldName,
      ref: pickerRef.current,
      getValue() {
        return selectedOption;
      },
    });
  }, [fieldName, registerField, selectedOption]);

  return (
    <>
      <Container
        style={
          disabled && {
            opacity: 0.4,
            borderColor: theme.colors.textPrimary,
          }
        }
      >
        <InputLabel>{label}</InputLabel>

        {name === "idestado" ? (
          <InputContainer
            ref={pickerRef}
            selectedValue={selectedOption}
            onValueChange={(itemValue: any) => {
              handleChange(itemValue);
              setSelectedOption(itemValue);
            }}
            enabled={!disabled}
          >
            <Picker.Item
              label={initialData?.label}
              value={initialData?.value}
              color={Platform.OS === "ios" ? theme.colors.textPrimary : ""}
            />

            {data &&
              data.map((item: TPickerItem) => (
                <Picker.Item
                  key={item.label}
                  label={item.label}
                  value={item.value}
                  color={Platform.OS === "ios" ? theme.colors.textPrimary : ""}
                />
              ))}
          </InputContainer>
        ) : (
          <InputContainer
            ref={pickerRef}
            selectedValue={selectedOption}
            onValueChange={(itemValue: any) => {
              handleChange(itemValue);
              setSelectedOption(itemValue);
            }}
            enabled={!disabled}
          >
            <Picker.Item
              label={initialData?.label}
              value={initialData?.value}
              color={Platform.OS === "ios" ? theme.colors.textPrimary : ""}
            />

            {data &&
              data.map((item: TPickerItem) => (
                <Picker.Item
                  key={item.label}
                  label={item.label}
                  value={item.value}
                  color={Platform.OS === "ios" ? theme.colors.textPrimary : ""}
                />
              ))}
          </InputContainer>
        )}
      </Container>
      {error && <Error>{error}</Error>}
    </>
  );
}
