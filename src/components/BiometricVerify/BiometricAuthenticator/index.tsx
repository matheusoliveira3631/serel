import { useCallback, useEffect, useState } from "react";

import * as LocalAuthenticator from "expo-local-authentication";
import * as SecureStore from "expo-secure-store";

import { useAuth } from "../../../hooks/auth";
import { useTheme } from "../../../hooks/theme";
import { sleep } from "../../../utils/sleep";
import Toast from "../../Toast";
import { BiometricDescription, Container, FingerIcon } from "./styles";

interface IBiometricAuthenticatorProps {
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function BiometricAuthenticator({
  setIsLoading,
}: IBiometricAuthenticatorProps) {
  const { user, signIn } = useAuth();
  const { theme } = useTheme();

  const [userTriedAccess, setUserTriedAccess] = useState(false);

  const handleBiometricAuth = useCallback(async () => {
    const biometricAuth = await LocalAuthenticator.authenticateAsync({
      promptMessage: "Acesso com a biometria",
      cancelLabel: "Usar senha",
      disableDeviceFallback: true,
    });

    if (biometricAuth.success) {
      setUserTriedAccess(false);

      const password = await SecureStore.getItemAsync(
        "anabb-prev_user_password",
      );

      if (!user.cpf || !password) {
        Toast({
          message: "Erro ao recuperar credenciais de acesso",
          description: "Por favor digite novamente suas informações",
          type: "danger",
          duration: 5000,
          icon: "danger",
        });
        return;
      }

      setIsLoading(true);

      signIn({
        cpf: user.cpf,
        password,
      });
    } else if (biometricAuth.error !== "user_cancel") {
      setUserTriedAccess(true);
    }
  }, [setIsLoading, signIn, user.cpf]);

  useEffect(() => {
    sleep(600).then(() => {
      if (!user.alreadyLogged) {
        handleBiometricAuth();
      }
    });
  }, [handleBiometricAuth, user.alreadyLogged]);

  return (
    <Container>
      <FingerIcon
        name="fingerprint"
        size={32}
        onPress={() => {
          handleBiometricAuth();
        }}
        style={{
          color: `${
            !userTriedAccess
              ? theme.colors.backgroundButton
              : theme.colors.danger
          }`,
        }}
      />

      <BiometricDescription
        style={{
          color: `${
            !userTriedAccess
              ? theme.colors.backgroundButton
              : theme.colors.danger
          }`,
        }}
      >
        {!userTriedAccess
          ? "Entre utilizando sua impressão digital"
          : "Tente novamente"}
      </BiometricDescription>
    </Container>
  );
}
