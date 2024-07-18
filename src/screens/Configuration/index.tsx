import { useState } from "react";
import { Dimensions } from "react-native";

import { Feather, MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

import { useTheme } from "../../hooks/theme";
import DefaultLayout from "../../theme/DefaultLayout";
import { BackPage, Divisor, Header } from "../../theme/DefaultLayout/styles";
import Theme from "./components/Theme";
import { CollapseTitle, CollapseTitleView } from "./styles";

const { width } = Dimensions.get("window");

export default function Configuration() {
  const { theme } = useTheme();
  const [changeThemeIsOpen, setChangeThemeIsOpen] = useState(false);

  const { goBack } = useNavigation();

  return (
    <DefaultLayout isLoading={false}>
      <Header>
        <Feather
          name="arrow-left"
          size={24}
          color={theme.colors.textPrimary}
          onPress={() => {
            goBack();
          }}
        />
        <BackPage>Configuração</BackPage>
      </Header>

      <Divisor style={{ width }} />
      <CollapseTitleView
        onPress={() => {
          setChangeThemeIsOpen(state => !state);
        }}
      >
        <Feather name="sun" size={24} color={theme.colors.textPrimary} />
        <CollapseTitle>Trocar tema do app</CollapseTitle>
        <MaterialIcons
          name={changeThemeIsOpen ? "keyboard-arrow-up" : "keyboard-arrow-down"}
          size={24}
          color={theme.colors.textPrimary}
          style={{ marginLeft: "auto" }}
        />
      </CollapseTitleView>
      {changeThemeIsOpen && <Theme />}
    </DefaultLayout>
  );
}
