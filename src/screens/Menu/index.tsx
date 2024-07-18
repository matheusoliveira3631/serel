import { ReactNode } from "react";
import { Dimensions } from "react-native";

import { Feather, FontAwesome5, Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

import { useTheme } from "../../hooks/theme";
import DefaultLayout from "../../theme/DefaultLayout";
import { BackPage, Divisor, Header } from "../../theme/DefaultLayout/styles";
import { ListButtons, ButtonsText, MenuButtons } from "./styles";

const { width } = Dimensions.get("window");

type ButtonsDataType = {
  route: keyof ReactNavigation.RootParamList;
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
        <Ionicons
          name="documents-sharp"
          size={24}
          color={theme.colors.textSecondary}
        />
      ),
    },
    {
      route: "register",
      label: "Dados de cadastro",
      icon: (
        <FontAwesome5
          name="id-badge"
          size={24}
          color={theme.colors.textSecondary}
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
      </ListButtons>
    </DefaultLayout>
  );
}
