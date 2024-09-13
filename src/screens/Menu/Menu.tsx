/* eslint-disable global-require */
import { ReactNode } from "react";
import { Dimensions, Image, View } from "react-native";

import { Feather, FontAwesome5, Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

import { useTheme } from "../../hooks/theme";
import DefaultLayout from "../../theme/DefaultLayout";
import { BackPage, Divisor, Header } from "../../theme/DefaultLayout/styles";
import {
  ListButtons,
  ButtonsText,
  MenuButtons,
  DisabledMenuButtons,
} from "./styles";

const { width } = Dimensions.get("window");

type ButtonsDataType = {
  route: keyof ReactNavigation.RootParamList;
  label: string;
  icon: ReactNode;
};

type DisabledButtonsDataType = {
  label: string;
  icon: ReactNode;
};

export default function Menu() {
  const { theme } = useTheme();
  const { goBack, navigate } = useNavigation();

  const buttonsData: ButtonsDataType[] = [
    {
      route: "extract",
      label: "Saldo e extrato",
      icon: (
        <FontAwesome5
          name="file-invoice-dollar"
          size={24}
          color={theme.colors.textSecondary}
        />
      ),
    },
    {
      route: "documents",
      label: "Documentos do plano",
      icon: (
        <Image
          source={require("../../../assets/docs.png")}
          style={{ width: 24, height: 24 }}
        />
      ),
    },
    {
      route: "register",
      label: "Dados de cadastro",
      icon: (
        <Image
          source={require("../../../assets/dados.png")}
          style={{ width: 22, height: 22 }}
        />
      ),
    },
    {
      route: "configuration",
      label: "Configurações do app",
      icon: (
        <Ionicons
          name="settings-outline"
          size={24}
          color={theme.colors.textSecondary}
        />
      ),
    },
  ];

  const buttonsDisabled: DisabledButtonsDataType[] = [
    {
      label: "Demonstrativo de Pagamentos",
      icon: (
        <Image
          source={require("../../../assets/docs.png")}
          style={{ width: 24, height: 24 }}
        />
      ),
    },
    {
      label: "Informe de rendimentos",
      icon: (
        <FontAwesome5
          name="file-invoice-dollar"
          size={24}
          color={theme.colors.textSecondary}
        />
      ),
    },
    {
      label: "Plano e beneficiários",
      icon: (
        <FontAwesome5
          name="file-invoice-dollar"
          size={24}
          color={theme.colors.textSecondary}
        />
      ),
    },
    {
      label: "Solicitações",
      icon: (
        <Image
          source={require("../../../assets/notification.png")}
          style={{ width: 24, height: 24 }}
        />
      ),
    },
    {
      label: "Contribuições",
      icon: (
        <FontAwesome5
          name="file-invoice-dollar"
          size={24}
          color={theme.colors.textSecondary}
        />
      ),
    },
  ];

  return (
    <DefaultLayout>
      <Header>
        <Feather
          name="arrow-left"
          size={24}
          color={theme.colors.textPrimary}
          onPress={() => {
            goBack();
          }}
        />
        <BackPage>Menu</BackPage>
      </Header>

      <Divisor style={{ width }} />

      <ListButtons>
        {buttonsData.map(button => (
          <MenuButtons
            key={button.route}
            onPress={() => {
              navigate(button.route);
            }}
          >
            {button.icon}
            <ButtonsText>{button.label}</ButtonsText>
          </MenuButtons>
        ))}
        {buttonsDisabled.map(button => (
          <DisabledMenuButtons key={button.label}>
            <Image
              source={require("../../../assets/Alert.png")}
              style={{
                position: "absolute",
                width: 36,
                height: 36,
                top: -10,
                right: -8,
              }}
            />
            <View
              style={{
                opacity: 0.5,
              }}
            >
              {button.icon}
              <ButtonsText>{button.label}</ButtonsText>
            </View>
          </DisabledMenuButtons>
        ))}
      </ListButtons>
    </DefaultLayout>
  );
}
