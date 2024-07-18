import { useEffect, useState } from "react";
import { View } from "react-native";

import * as LocalAuthenticator from "expo-local-authentication";

import BiometricAuthenticator from "./BiometricAuthenticator";

interface IBiometricVerifyProps {
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function BiometricVerify({
  setIsLoading,
}: IBiometricVerifyProps) {
  const [isBiometricSupported, setIsBiometricSupported] = useState(false);
  const [haveSavedBiometrics, setHaveSavedBiometrics] = useState(false);

  useEffect(() => {
    async function loadBiometricData() {
      const compatible = await LocalAuthenticator.hasHardwareAsync();
      setIsBiometricSupported(compatible);

      const savedBiometrics = await LocalAuthenticator.isEnrolledAsync();
      setHaveSavedBiometrics(savedBiometrics);
    }

    loadBiometricData();
  }, []);

  return (
    <View>
      {isBiometricSupported && haveSavedBiometrics && (
        <BiometricAuthenticator setIsLoading={setIsLoading} />
      )}
    </View>
  );
}
