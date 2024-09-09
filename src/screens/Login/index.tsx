import { useCallback, useRef, useState } from "react";
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
} from "react-native";

import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { FormHandles } from "@unform/core";
import { Form } from "@unform/mobile";
import * as Yup from "yup";

import logoANABBDark from "../../../assets/logo-serel-dark.png";
import logoANABBLight from "../../../assets/logo-serel-light.png";
import BiometricVerify from "../../components/BiometricVerify";
import BottomSheetDoubts from "../../components/BottomSheet/BottomSheetDoubts";
import Button from "../../components/form/Button";
import Input from "../../components/form/Input";
import InputMask from "../../components/form/Input/InputMask";
import Loading from "../../components/Loading";
import { useAuth } from "../../hooks/auth";
import { useTheme } from "../../hooks/theme";
import DefaultLayout from "../../theme/DefaultLayout";
import getValidationErrors from "../../utils/getValidationErrors";
import hideCPF from "../../utils/hideCPF";
import validateCPF from "../../utils/validateCPF";
import {
  Container,
  ImageLogo,
  FormHeader,
  Main,
  WelcomeText,
  Footer,
  ForgetPassword,
  ChangeAccount,
} from "./styles";

type DataFormLogin = {
  cpf: string;
  password: string;
};

export default function Login() {
  const formRef = useRef<FormHandles>(null);
  const { navigate } = useNavigation();

  const { user, signOut, signIn } = useAuth();
  const { theme } = useTheme();

  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = useCallback(
    async (data: DataFormLogin) => {
      setIsLoading(true);
      formRef.current?.setErrors({});

      const schema = Yup.object().shape({
        cpf: Yup.string()
          .required("Campo obrigatório")
          .test("test-cpf", "CPF deve ser válido", cpf => {
            if (cpf) {
              return validateCPF(cpf);
            }

            return false;
          }),
        password: Yup.string().required("Campo obrigatório"),
      });

      try {
        if (user.cpf === "") {
          const validatedSchema = await schema.validate(data, {
            abortEarly: false,
          });

          await signIn(validatedSchema);
        } else {
          await schema.validate(
            { cpf: user.cpf, password: data.password },
            {
              abortEarly: false,
            },
          );
          await signIn({ cpf: user.cpf, password: data.password });
        }
      } catch (error: any) {
        setIsLoading(false);

        if (error instanceof Yup.ValidationError) {
          formRef.current?.setErrors(getValidationErrors(error));
        }
      }
    },
    [signIn, user.cpf],
  );

  const [bottomSheetIsVisible, setBottomSheetIsVisible] = useState(false);
  const [canSeePassword, setCanSeePassword] = useState(false);

  return (
    <DefaultLayout>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
          <Container>
            <ImageLogo
              source={theme.title === "dark" ? logoANABBDark : logoANABBLight}
            />

            <Main>
              <FormHeader>
                <WelcomeText>Bem-vindo (a)</WelcomeText>
                <Feather
                  name="help-circle"
                  size={20}
                  color={String(theme.colors.backgroundButton)}
                  onPress={() => {
                    setBottomSheetIsVisible(true);
                    Keyboard.dismiss();
                  }}
                />
              </FormHeader>

              <Form onSubmit={handleSubmit} ref={formRef}>
                {!user.cpf ? (
                  <InputMask
                    type="cpf"
                    label="Digite seu CPF"
                    name="cpf"
                    keyboardType="numeric"
                  />
                ) : (
                  <Input
                    label="CPF"
                    name="cpf"
                    keyboardType="numeric"
                    defaultValue={hideCPF(user.cpf)}
                    iconRight="repeat"
                    iconRightFunction={() => {
                      signOut();
                    }}
                    editable={false}
                  />
                )}

                <Input
                  label="Digite sua senha"
                  name="password"
                  secureTextEntry={!canSeePassword}
                  iconRight={canSeePassword ? "eye-off" : "eye"}
                  iconRightFunction={() => {
                    setCanSeePassword(!canSeePassword);
                  }}
                />

                {isLoading ? (
                  <Button>
                    <Loading />
                  </Button>
                ) : (
                  <Button
                    onPress={() => {
                      formRef.current?.submitForm();
                    }}
                  >
                    ENTRAR
                  </Button>
                )}
              </Form>

              <Footer>
                <ForgetPassword
                  onPress={() => {
                    navigate("forget-password");
                  }}
                >
                  Esqueci minha senha
                </ForgetPassword>
                {user.cpf && (
                  <ChangeAccount onPress={() => signOut()}>
                    Trocar de conta
                  </ChangeAccount>
                )}
              </Footer>
            </Main>

            {user.cpf && <BiometricVerify setIsLoading={setIsLoading} />}
          </Container>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
      <BottomSheetDoubts
        isVisible={bottomSheetIsVisible}
        setIsVisible={setBottomSheetIsVisible}
      />
    </DefaultLayout>
  );
}
