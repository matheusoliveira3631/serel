import { Dimensions } from "react-native";

import { Feather } from "@expo/vector-icons";

import { useTheme } from "../../hooks/theme";
import {
  NeedHelpContent,
  NeedHelpDescription,
  NeedHelpTitle,
  ViewNeedHelp,
} from "./styles";

const { width } = Dimensions.get("window");

interface INeedHelpProps {
  setIsVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function NeedHelp({ setIsVisible }: INeedHelpProps) {
  const { theme } = useTheme();

  return (
    <ViewNeedHelp
      style={{ width, marginHorizontal: 0, marginBottom: 80 }}
      onPress={() => {
        setIsVisible(state => !state);
      }}
    >
      <Feather
        name="help-circle"
        size={56}
        color={theme.colors.backgroundButton}
      />
      <NeedHelpContent>
        <NeedHelpTitle>Precisa de ajuda?</NeedHelpTitle>
        <NeedHelpDescription>
          Fale com um atendente, tire suas dúvidas e acompanhe seus chamados
        </NeedHelpDescription>
      </NeedHelpContent>
      <Feather
        name="chevron-right"
        size={32}
        color={theme.colors.textSecondary}
      />
    </ViewNeedHelp>
  );
}
