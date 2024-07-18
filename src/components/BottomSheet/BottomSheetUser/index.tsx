import { Dispatch, SetStateAction, useRef } from "react";
import { Text, FlatList, View, Dimensions, PixelRatio } from "react-native";

import { Feather, FontAwesome5, Ionicons } from "@expo/vector-icons";
import BottomSheet from "@gorhom/bottom-sheet";
import { useNavigation } from "@react-navigation/native";

import logoANABBDark from "../../../../assets/logo-serel-dark.png";
import logoANABBLight from "../../../../assets/logo-serel-light.png";
import logoSerelDark from "../../../../assets/serel-logo-dark.png";
import logoSerelLight from "../../../../assets/serel-logo-light.png";

import BottomSheetComponent from "..";

import { useAuth } from "../../../hooks/auth";
import { useSubscription } from "../../../hooks/subscriptions";
import { useTheme } from "../../../hooks/theme";
import {
  ButtonItem,
  ButtonText,
  Divisor,
  FirstBox,
  Footer,
  Header,
  ImageLogo,
  ImagePoweredBySerel,
  TextAppVersion,
  TextPoweredBy,
  TextSignOut,
  UserInscription,
  UserName,
  ViewButtons,
  ViewPoweredBy,
  ViewSignOut,
  ViewUserInfo,
  ViewUserPlanInfo,
} from "./styles";

const { width } = Dimensions.get("window");

interface IBottomSheetUserProps {
  isVisible: boolean;
  setIsVisible: Dispatch<SetStateAction<boolean>>;
}

export default function BottomSheetUser({
  isVisible,
  setIsVisible,
}: IBottomSheetUserProps) {
  const { theme } = useTheme();
  const { navigate } = useNavigation();
  const bottomSheetRef = useRef<BottomSheet>(null);
  const { onlyBack } = useAuth();

  const { subscription } = useSubscription();
  const { user } = useAuth();

  const tamanhoFonte = 16 * PixelRatio.getFontScale();

  const data = [
    { id: "1", label: "PLANO:", field: subscription?.plano },
    { id: "2", label: "SITUAÇÃO", field: subscription?.situacao },
    { id: "3", label: "PATROCINADORA:", field: subscription?.patrocinadora },
  ];

  return (
    <BottomSheetComponent
      bottomSheetRef={bottomSheetRef}
      isVisible={isVisible}
      setIsVisible={setIsVisible}
      snapPoints={tamanhoFonte > 18 ? "90%" : "65%"}
    >
      <ImageLogo
        source={theme.title === "dark" ? logoANABBDark : logoANABBLight}
      />

      <Header>
        <FirstBox>
          <Feather name="user" size={64} color={theme.colors.textPrimary} />

          <ViewUserInfo>
            <UserName style={tamanhoFonte > 18 && { width: "80%" }}>
              {user.name}
            </UserName>
            <InfoFields
              label="INSCRIÇÃO:"
              field={subscription?.numInscr || ""}
            />
          </ViewUserInfo>
        </FirstBox>

        <ViewUserPlanInfo>
          <FlatList
            data={data}
            keyExtractor={item => item.id}
            numColumns={tamanhoFonte > 18 ? 1 : 2}
            renderItem={({ item, index }) => {
              if (tamanhoFonte > 18) {
                return (
                  <View>
                    <InfoFields label={item.label} field={item?.field || ""} />
                  </View>
                );
              }
              return (
                <View style={index % 2 === 1 ? { marginLeft: "auto" } : {}}>
                  <InfoFields label={item.label} field={item?.field || ""} />
                </View>
              );
            }}
          />
        </ViewUserPlanInfo>
      </Header>

      <Divisor style={{ width }} />

      <ViewButtons>
        <ButtonItem
          onPress={() => {
            navigate("extract");
          }}
        >
          <Feather
            name="file-text"
            size={20}
            color={theme.colors.textPrimary}
          />
          <ButtonText>Saldo e extrato</ButtonText>
          <Feather
            name="chevron-right"
            size={20}
            color={theme.colors.textPrimary}
          />
        </ButtonItem>
        <ButtonItem
          onPress={() => {
            navigate("documents");
          }}
        >
          <Ionicons
            name="documents-sharp"
            size={24}
            color={theme.colors.textPrimary}
          />
          <ButtonText>Documentos</ButtonText>
          <Feather
            name="chevron-right"
            size={20}
            color={theme.colors.textPrimary}
          />
        </ButtonItem>
        <ButtonItem
          onPress={() => {
            navigate("register");
          }}
        >
          <FontAwesome5
            name="id-badge"
            size={20}
            color={theme.colors.textPrimary}
          />
          <ButtonText>Dados de cadastro</ButtonText>
          <Feather
            name="chevron-right"
            size={20}
            color={theme.colors.textPrimary}
          />
        </ButtonItem>
        <ButtonItem
          onPress={() => {
            navigate("configuration");
          }}
        >
          <Feather name="settings" size={20} color={theme.colors.textPrimary} />
          <ButtonText>Configurações do APP</ButtonText>
          <Feather
            name="chevron-right"
            size={20}
            color={theme.colors.textPrimary}
          />
        </ButtonItem>
      </ViewButtons>

      <Footer>
        <ViewSignOut
          onPress={() => {
            onlyBack();
          }}
        >
          <Feather name="log-out" size={24} color={theme.colors.danger} />
          <TextSignOut>Sair do app</TextSignOut>
        </ViewSignOut>

        <TextAppVersion>Versão 1.1.0</TextAppVersion>

        <ViewPoweredBy>
          <TextPoweredBy>Powered by</TextPoweredBy>
          <ImagePoweredBySerel
            source={theme.title === "dark" ? logoSerelDark : logoSerelLight}
          />
        </ViewPoweredBy>
      </Footer>
    </BottomSheetComponent>
  );
}

interface IInfoFields {
  label: string;
  field: string;
}

function InfoFields({ label, field }: IInfoFields) {
  const { theme } = useTheme();

  return (
    <UserInscription style={{ maxWidth: 210 }}>
      {label}{" "}
      <Text
        style={{
          fontWeight: "bold",
          color: theme.colors.textPrimary,
          textTransform: "uppercase",
        }}
      >
        {field}
      </Text>
    </UserInscription>
  );
}
