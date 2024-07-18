import { useCallback, useRef, useState } from "react";
import { View, KeyboardAvoidingView, Platform } from "react-native";

import { useNavigation } from "@react-navigation/native";
import { FormHandles } from "@unform/core";
import { Form } from "@unform/mobile";
import LottieView from "lottie-react-native";
import * as Yup from "yup";

import sendedEmailAnimation from "../../../assets/sended-email.json";
import Button from "../../components/form/Button";
import InputMask from "../../components/form/Input/InputMask";
import Loading from "../../components/Loading";
import Toast from "../../components/Toast";
import forgotPassword from "../../services/routes/forgotPassword";
import DefaultLayout from "../../theme/DefaultLayout";
import getValidationErrors from "../../utils/getValidationErrors";
import validateCPF from "../../utils/validateCPF";
import {
  Container,
  ContentContainer,
  DescribeAction,
  HasRegistration,
  HasRegistrationView,
  LinkToLogin,
  LottieContainer,
  Title,
} from "./styles";

type DataFormLogin = {
  cpf: string;
};

export default function ForgotPassword() {
  const formRef = useRef<FormHandles>(null);
  const { navigate } = useNavigation();

  const [hasBeenReset, setHasBeenReset] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = useCallback(async (formData: DataFormLogin) => {
    formRef.current?.setErrors({});

    const schema = Yup.object().shape({
      cpf: Yup.string()
        .required("CPF é obrigatório")
        .test("test-cpf", "CPF deve ser válido", cpf => {
          if (cpf) {
            return validateCPF(cpf);
          }

          return false;
        }),
    });

    try {
      setIsLoading(true);

      await schema.validate(formData, {
        abortEarly: false,
      });

      await forgotPassword({ cpf: formData.cpf });

      setIsLoading(false);
      setHasBeenReset(true);
    } catch (error: any) {
      setIsLoading(false);

      if (error instanceof Yup.ValidationError) {
        const errors = getValidationErrors(error);

        formRef.current?.setErrors(errors);

        return;
      }

      Toast({
        message: "Erro ao redefinir senha",
        description:
          "Por favor verifique suas informações ou tente novamente mais tarde",
        type: "danger",
        duration: 5000,
        icon: "danger",
      });
    }
  }, []);

  if (hasBeenReset) {
    return (
      <DefaultLayout>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
          <Container>
            <Title>Email enviado com sucesso</Title>

            <LottieContainer>
              <LottieView
                source={sendedEmailAnimation}
                autoPlay
                loop={false}
                style={{ width: 256, height: 256 }}
              />
            </LottieContainer>

            <DescribeAction style={{ fontSize: 16, textAlign: "center" }}>
              Acesse o email e cria a sua nova senha para poder acessar o app.
            </DescribeAction>

            <Button
              onPress={() => {
                navigate("login");
              }}
            >
              Fazer login
            </Button>
          </Container>
        </KeyboardAvoidingView>
      </DefaultLayout>
    );
  }

  return (
    <DefaultLayout>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <Container>
          <Title>Redefinição de senha</Title>

          <ContentContainer>
            <Form ref={formRef} onSubmit={handleSubmit}>
              <DescribeAction>
                Insira seu CPF abaixo para podermos enviar para o seu email
                cadastrado o link para alterar a sua senha.
              </DescribeAction>
              <InputMask
                label="CPF"
                type="cpf"
                name="cpf"
                keyboardType="numeric"
              />
              {isLoading ? (
                <View style={{ marginTop: 12 }}>
                  <Loading />
                </View>
              ) : (
                <Button
                  onPress={() => {
                    formRef.current?.submitForm();
                  }}
                  disabled={isLoading}
                >
                  Redefinir senha
                </Button>
              )}
            </Form>

            {!isLoading && (
              <HasRegistrationView>
                <HasRegistration>Já possui cadastro?</HasRegistration>
                <LinkToLogin
                  onPress={() => {
                    navigate("login");
                  }}
                >
                  Faça seu login
                </LinkToLogin>
              </HasRegistrationView>
            )}
          </ContentContainer>
        </Container>
      </KeyboardAvoidingView>
    </DefaultLayout>
  );
}
