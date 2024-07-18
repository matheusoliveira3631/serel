import { Dispatch, SetStateAction, useRef, useCallback } from "react";
import { KeyboardAvoidingView, Platform, ScrollView, View } from "react-native";

import BottomSheet from "@gorhom/bottom-sheet";
import { FormHandles } from "@unform/core";
import { Form } from "@unform/mobile";
import { differenceInYears, parse, subMonths, subYears } from "date-fns";
import * as Yup from "yup";

import { useTheme } from "../../../hooks/theme";

import BottomSheetComponent from "..";

import getValidationErrors from "../../../utils/getValidationErrors";
import Button from "../../form/Button";
import InputMask from "../../form/Input/InputMask";
import Toast from "../../Toast";
import {
  ButtonItem,
  ButtonText,
  Container,
  Description,
  Title,
} from "./styles";

interface IBottomSheetPeriodExtractProps {
  isVisible: boolean;
  setIsVisible: Dispatch<SetStateAction<boolean>>;
  selectedPeriod: "6" | "1" | "2" | "custom";
  setSelectedPeriod: Dispatch<SetStateAction<"6" | "1" | "2" | "custom">>;
  handleChange: (initialDate: Date, final?: Date) => void;
}

type OptionsOfPeriodType = {
  id: string;
  period: "6" | "1" | "2" | "custom";
};

type FormDataType = {
  initialDate: string;
  finalDate: string;
};

const optionsOfPeriod: OptionsOfPeriodType[] = [
  {
    id: "1",
    period: "6",
  },
  {
    id: "2",
    period: "1",
  },
  {
    id: "3",
    period: "2",
  },
  {
    id: "4",
    period: "custom",
  },
];

export default function BottomSheetPeriodExtract({
  isVisible,
  setIsVisible,
  selectedPeriod,
  setSelectedPeriod,
  handleChange,
}: IBottomSheetPeriodExtractProps) {
  const bottomSheetRef = useRef<BottomSheet>(null);
  const formRef = useRef<FormHandles>(null);

  const { theme } = useTheme();

  const handleSubmit = useCallback(
    async (formData: FormDataType) => {
      formRef.current?.setErrors({});

      const schema = Yup.object()
        .shape({
          initialDate: Yup.string()
            .matches(/^(0[1-9]|1[0-2])\/[0-9]{4}$/, "Data inválida")
            .required("Data obrigatória"),
          finalDate: Yup.string()
            .matches(/^(0[1-9]|1[0-2])\/[0-9]{4}$/, "Data inválida")
            .test(
              "greater-than-start",
              "A data final deve ser maior do que a data inicial",
              // eslint-disable-next-line func-names
              function (value: any) {
                // eslint-disable-next-line react/no-this-in-sfc
                const { initialDate } = this.parent;
                const initialDateObj = parse(
                  initialDate,
                  "MM/yyyy",
                  new Date(),
                );
                const finalDateObj = parse(value, "MM/yyyy", new Date());
                return finalDateObj > initialDateObj;
              },
            )
            .required("Data obrigatória"),
        })
        .test(
          "date-range",
          "O período deve ser de no máximo 2 anos",
          // eslint-disable-next-line func-names
          function (values) {
            const { initialDate, finalDate } = values;
            const [mesIni, anoIni] = initialDate.split("/");
            const [mesFin, anoFin] = finalDate.split("/");

            const diff = differenceInYears(
              new Date(Number(anoFin), Number(mesFin), 1),
              new Date(Number(anoIni), Number(mesIni), 1),
            );

            if (diff <= 2) {
              return true;
            }

            Toast({
              message: "Erro ao filtrar",
              description: "O período deve ser de no máximo 2 anos",
              type: "danger",
              duration: 5000,
              icon: "danger",
            });
            return false;
          },
        );

      try {
        const today = new Date();

        const [mesIni, anoIni] = formData.initialDate.split("/");
        const [mesFin, anoFin] = formData.finalDate.split("/");

        switch (selectedPeriod) {
          case "custom":
            await schema.validate(formData, {
              abortEarly: false,
            });

            handleChange(
              new Date(parseInt(anoIni, 10), parseInt(mesIni, 10) - 1, 1),
              new Date(parseInt(anoFin, 10), parseInt(mesFin, 10) - 1, 1),
            );
            break;
          case "6":
            handleChange(subMonths(today, 6));
            break;
          case "1":
            handleChange(subYears(today, 1));
            break;
          case "2":
            handleChange(subYears(today, 1));
            break;
          default:
            break;
        }

        bottomSheetRef.current?.close();
        setIsVisible(false);
      } catch (error: any) {
        const errors = getValidationErrors(error);

        formRef.current?.setErrors(errors);
      }
    },
    [selectedPeriod, handleChange, setIsVisible],
  );

  return (
    <BottomSheetComponent
      bottomSheetRef={bottomSheetRef}
      isVisible={isVisible}
      setIsVisible={setIsVisible}
      snapPoints="70%"
    >
      <ScrollView showsVerticalScrollIndicator={false}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          // keyboardVerticalOffset={70}
        >
          <Container>
            <Title>Últimos períodos</Title>

            <View
              style={{
                justifyContent: "space-around",
                flexDirection: "row",

                flexWrap: "wrap",
                gap: 4,
                marginVertical: 16,
              }}
            >
              {optionsOfPeriod.map(item => (
                <Item
                  key={item.id}
                  title={item.period}
                  selectedPeriod={selectedPeriod}
                  setSelectedPeriod={setSelectedPeriod}
                />
              ))}
            </View>

            <Title style={{ marginBottom: 8 }}>Selecionar Período</Title>

            <Form
              onSubmit={handleSubmit}
              ref={formRef}
              style={{
                width: "100%",
                gap: 16,
              }}
            >
              <InputMask
                label="Data inicial"
                name="initialDate"
                keyboardType="numeric"
                type="datetime"
                options={{
                  format: "MM/YYYY",
                }}
                placeHolder="00/0000"
                editable={selectedPeriod === "custom"}
              />

              <InputMask
                label="Data final"
                name="finalDate"
                keyboardType="numeric"
                type="datetime"
                options={{
                  format: "MM/YYYY",
                }}
                placeHolder="00/0000"
                editable={selectedPeriod === "custom"}
              />
            </Form>

            <Description>
              Confira seu extrato com período máximo de 2 anos.
            </Description>

            <Button
              onPress={() => {
                formRef.current?.submitForm();
              }}
            >
              FILTRAR
            </Button>
            <Button
              style={{
                backgroundColor: "transparent",
                borderWidth: 2,
                borderColor: theme.colors.primary,
              }}
              type="PRIMARY"
            >
              LIMPAR FILTRO
            </Button>
          </Container>
        </KeyboardAvoidingView>
      </ScrollView>
    </BottomSheetComponent>
  );
}
interface IItemProps {
  title: "6" | "1" | "2" | "custom";
  selectedPeriod: "6" | "1" | "2" | "custom";
  setSelectedPeriod: Dispatch<SetStateAction<"6" | "1" | "2" | "custom">>;
}

function Item({ title, selectedPeriod, setSelectedPeriod }: IItemProps) {
  const { theme } = useTheme();

  function renderButton(titleReceived: string) {
    switch (titleReceived) {
      case "6":
        return "6 meses";
      case "1":
        return "1 ano";
      case "2":
        return "2 anos";
      case "custom":
        return "Personalizado";
      default:
        return title;
    }
  }

  return (
    <ButtonItem
      onPress={() => {
        setSelectedPeriod(title);
      }}
      style={
        title === selectedPeriod
          ? { backgroundColor: theme.colors.backgroundButtonSelected }
          : {}
      }
    >
      <ButtonText>{renderButton(title)}</ButtonText>
    </ButtonItem>
  );
}
