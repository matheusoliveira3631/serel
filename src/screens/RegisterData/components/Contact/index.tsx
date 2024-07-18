import { useRef, useCallback, useEffect, useState } from "react";
import { View, KeyboardAvoidingView, Platform } from "react-native";

import { FormHandles } from "@unform/core";
import { Form } from "@unform/mobile";
import * as Yup from "yup";

import Button from "../../../../components/form/Button";
import InputProfile from "../../../../components/form/InputProfile";
import InputProfileMask from "../../../../components/form/InputProfileMask";
import Toast from "../../../../components/Toast";
import { useAuth } from "../../../../hooks/auth";
import { useTheme } from "../../../../hooks/theme";
import postContactData from "../../../../services/routes/screens/resources/postContactData";
import getValidationErrors from "../../../../utils/getValidationErrors";
import { CollapseWithTwoItems } from "../../styles";

interface IContactProps {
  userData: {
    telFixo: string;
    telCelular: string;
    email: string;
  };
  canEditForm: boolean;
  setCanEditForm: React.Dispatch<React.SetStateAction<boolean>>;
}

type TFormData = {
  landline: string;
  phone: string;
  email: string;
};

function deleteSpecialCharacters(value: string) {
  return value
    .replaceAll("(", "")
    .replaceAll(")", "")
    .replaceAll("-", "")
    .replaceAll(" ", "");
}

export default function Contact({
  userData,
  canEditForm,
  setCanEditForm,
}: IContactProps) {
  const { user } = useAuth();
  const formRef = useRef<FormHandles>(null);
  const { theme } = useTheme();

  const [isSending, setIsSending] = useState(false);

  useEffect(() => {
    formRef.current?.setErrors({});
  }, [canEditForm]);

  const handleSubmit = useCallback(
    async (formData: TFormData) => {
      formRef.current?.setErrors({});

      const telFixoWithoutCharacters = deleteSpecialCharacters(
        userData.telFixo,
      );
      const telCelularWithoutCharacters = deleteSpecialCharacters(
        userData.telCelular,
      );

      // Validar se pelo menos um campos foi alterado
      if (
        formData.landline === telFixoWithoutCharacters &&
        formData.phone === telCelularWithoutCharacters &&
        formData.email === userData.email
      ) {
        setCanEditForm(false);

        return;
      }

      const schema = Yup.object().shape({
        landline: Yup.string().min(10, "Digite um telefone válido"),
        phone: Yup.string().min(10, "Digite um telefone válido"),
        email: Yup.string().email("E-mail inválido"),
      });

      try {
        await schema.validate(formData, {
          abortEarly: false,
        });

        setIsSending(true);

        await postContactData({ contactData: formData, codPes: user.codPes });

        setIsSending(false);

        Toast({
          message: "Dados enviados com sucesso",
          description: "Seus dados foram enviados e salvos no sistema",
          type: "success",
          duration: 5000,
          icon: "success",
        });

        setCanEditForm(false);
      } catch (error: any) {
        setIsSending(false);

        if (error instanceof Yup.ValidationError) {
          const errors = getValidationErrors(error);

          formRef.current?.setErrors(errors);

          Toast({
            message: "Erro ao salvar informações",
            description: "Por favor verifique os seus dados",
            type: "danger",
            duration: 5000,
            icon: "danger",
          });

          return;
        }

        Toast({
          message: "Erro ao enviar as suas informações",
          description:
            "Por favor tente novamente. Caso persista, contate o suporte",
          type: "danger",
          duration: 8000,
          icon: "danger",
        });
      }
    },
    [
      setCanEditForm,
      user.codPes,
      userData.email,
      userData.telCelular,
      userData.telFixo,
    ],
  );

  return (
    <Form onSubmit={handleSubmit} ref={formRef}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <CollapseWithTwoItems>
          <View style={{ flex: 1, marginRight: 8 }}>
            <InputProfileMask
              label="Telefone fixo:"
              name="landline"
              defaultValue={userData.telFixo}
              disabled={!canEditForm}
              maskType="phone"
              keyboardType="number-pad"
            />
          </View>
          <View style={{ flex: 1, marginLeft: 8 }}>
            <InputProfileMask
              label="Celular:"
              name="phone"
              defaultValue={userData.telCelular}
              disabled={!canEditForm}
              maskType="phone"
              keyboardType="number-pad"
            />
          </View>
        </CollapseWithTwoItems>

        <InputProfile
          label="Email:"
          name="email"
          defaultValue={userData.email}
          disabled={!canEditForm}
          keyboardType="email-address"
        />

        {canEditForm && (
          <Button
            style={{
              marginBottom: 24,
              backgroundColor: theme.colors.secondary,
            }}
            onPress={() => {
              formRef.current?.submitForm();
            }}
            isLoading={isSending}
          >
            Salvar informações
          </Button>
        )}
      </KeyboardAvoidingView>
    </Form>
  );
}
