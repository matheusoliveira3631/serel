import { FontAwesome5, Ionicons, Entypo } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

import Button from "../../../../components/form/Button";
import { useSubscription } from "../../../../hooks/subscriptions";
import { useTheme } from "../../../../hooks/theme";
import { ButtonItem, ButtonText, ViewButtons } from "./styles";
import { Linking } from "react-native";

export default function ButtonsForNavigation() {
  const { navigate } = useNavigation();
  const { theme } = useTheme();
  const { subscription } = useSubscription();

  return (
    <ViewButtons>
      <ButtonItem>
        <Button
          style={{
            borderRadius: 16,
            backgroundColor: theme.colors.backgroundButtonActions,
          }}
          onPress={() => {
            navigate("extract");
          }}
        >
          <FontAwesome5 name="file-invoice-dollar" size={20} color="white" />
        </Button>
        <ButtonText>
          {subscription?.processo ? "Saldo beneficiário" : "Saldo e extrato"}
        </ButtonText>
      </ButtonItem>
      <ButtonItem>
        <Button
          style={{
            borderRadius: 16,
            backgroundColor: theme.colors.backgroundButtonActions,
          }}
          onPress={() => {
            navigate("documents");
          }}
        >
          <Ionicons name="documents-sharp" size={20} color="white" />
        </Button>
        <ButtonText>Documentos do plano</ButtonText>
      </ButtonItem>
      <ButtonItem>
        <Button
          style={{
            borderRadius: 16,
            backgroundColor: theme.colors.backgroundButtonActions,
          }}
          onPress={() => {
            navigate("register");
          }}
        >
          <FontAwesome5 name="id-badge" size={20} color="white" />
        </Button>
        <ButtonText>Dados de cadastro</ButtonText>
      </ButtonItem>

      <ButtonItem>
        <Button
          style={{
            borderRadius: 16,
            backgroundColor: theme.colors.backgroundButtonActions,
          }}
          onPress={() => {
            Linking.openURL("https://restrito.anabbprev.org.br/restrito/emprestimo");
          }}
        >
          <FontAwesome5 name="credit-card" size={20} color="white" />
        </Button>
        <ButtonText>Simulador de Empréstimos</ButtonText>
      </ButtonItem>

      <ButtonItem>
        <Button
          style={{
            borderRadius: 16,
            backgroundColor: theme.colors.backgroundButtonActions,
          }}
          onPress={() => {
            navigate("menu");
          }}
        >
          <Entypo name="dots-three-horizontal" size={20} color="white" />
        </Button>
        <ButtonText>Ver todos</ButtonText>
      </ButtonItem>
    </ViewButtons>
  );
}
