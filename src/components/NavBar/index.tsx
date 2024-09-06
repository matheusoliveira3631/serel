import { ReactNode } from "react";
import { Dimensions } from "react-native";

import { Feather, FontAwesome5, Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

import { useTheme } from "../../hooks/theme";
import { BackPage, Divisor, Header } from "../../theme/DefaultLayout/styles";
import { Container } from "../FileDownload/styles";
import { ListButtons, ButtonsText, MenuButtons } from "./styles";

const { width } = Dimensions.get("window");

type ButtonsDataType = {
  route: keyof ReactNavigation.RootParamList;
  // label: string;
  icon: ReactNode;
};

export default function NavBar() {
  const { theme } = useTheme();
  const { goBack, navigate } = useNavigation();

  const buttonsData: ButtonsDataType[] = [
    {
      route: "extract",
      icon: (
        <FontAwesome5
          name="file-invoice-dollar"
          size={25}
          color={theme.colors.textSecondary}
        />
      ),
    },
    {
      route: "documents",
      icon: (
        <Ionicons
          name="documents-sharp"
          size={25}
          color={theme.colors.textSecondary}
        />
      ),
    },
    {
      route: "register",
      icon: (
        <FontAwesome5
          name="id-badge"
          size={25}
          color={theme.colors.textSecondary}
        />
      ),
    },
    {
      route: "configuration",
      icon: (
        <Ionicons
          name="settings-outline"
          size={25}
          color={theme.colors.textSecondary}
        />
      ),
    },
  ];

  return (
    <ListButtons>
      {buttonsData.map(button => (
        <MenuButtons
          key={button.route}
          onPress={() => {
            navigate(button.route);
          }}
        >
          {button.icon}
        </MenuButtons>
      ))}
    </ListButtons>
  );
}
