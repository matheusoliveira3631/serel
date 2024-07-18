import { useEffect, useState } from "react";
import { Dimensions } from "react-native";

import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

import Toast from "../../components/Toast";
import { useAuth } from "../../hooks/auth";
import { useSubscription } from "../../hooks/subscriptions";
import { useTheme } from "../../hooks/theme";
import documents from "../../services/routes/screens/documents";
import { TDocumentsData } from "../../services/routes/screens/resources/resources";
import DefaultLayout from "../../theme/DefaultLayout";
import { BackPage, Header, Divisor } from "../../theme/DefaultLayout/styles";
import DocumentCategory from "./components/DocumentCategory";
import DocumentsSkeleton from "./components/Skeleton";
import { ViewContent } from "./styles";

const { width } = Dimensions.get("window");

export default function Documents() {
  const [documentsData, setDocumentsData] = useState<TDocumentsData[]>([]);

  const [isLoading, setIsLoading] = useState(true);

  const { theme } = useTheme();
  const { user } = useAuth();
  const { subscription } = useSubscription();

  const { goBack } = useNavigation();

  useEffect(() => {
    async function loadDocuments() {
      try {
        const data = await documents({
          codPes: user.codPes,
          codPlano: subscription?.codPlano || "",
          numInscr: subscription?.numInscr || "",
        });

        setDocumentsData(data);

        setIsLoading(false);
      } catch (error) {
        Toast({
          message: "Erro ao carregar documentos",
          description: "Por favor tente novamente mais tarde",
          type: "danger",
          duration: 5000,
          icon: "danger",
        });

        goBack();
      }
    }
    loadDocuments();
  }, [goBack, subscription?.codPlano, subscription?.numInscr, user.codPes]);

  return (
    <DefaultLayout isLoading={isLoading}>
      <Header>
        <Feather
          name="arrow-left"
          size={24}
          color={theme.colors.textPrimary}
          onPress={() => {
            goBack();
          }}
        />
        <BackPage>Documentos</BackPage>
      </Header>

      <Divisor style={{ width }} />

      {isLoading ? (
        <DocumentsSkeleton />
      ) : (
        <ViewContent>
          {documentsData.map(document => (
            <DocumentCategory key={document.categoria} data={document} />
          ))}
        </ViewContent>
      )}
    </DefaultLayout>
  );
}
