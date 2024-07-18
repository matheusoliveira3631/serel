import { useState, useEffect } from "react";
import { Dimensions } from "react-native";

import { Feather, Entypo, MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

import Toast from "../../components/Toast";
import { useAuth } from "../../hooks/auth";
import { useSubscription } from "../../hooks/subscriptions";
import { useTheme } from "../../hooks/theme";
import registerData from "../../services/routes/screens/registerData";
import { TUF } from "../../services/routes/screens/resources/getUFList";
import { TRegistrationData } from "../../services/routes/screens/resources/resources";
import DefaultLayout from "../../theme/DefaultLayout";
import { BackPage, Header, Divisor } from "../../theme/DefaultLayout/styles";
import Address from "./components/Address";
import Contact from "./components/Contact";
import PersonalData from "./components/PersonalData";
import RegisterDataSkeleton from "./Skeleton";
import { Container, CollapsibleItem, CollapsibleTitle } from "./styles";

const { width } = Dimensions.get("window");

export default function Profile() {
  const { goBack } = useNavigation();
  const { user } = useAuth();
  const { subscription } = useSubscription();
  const { theme } = useTheme();

  const [isLoading, setIsLoading] = useState(true);
  const [userRegisterData, setUserRegisterData] = useState<TRegistrationData>(
    {} as TRegistrationData,
  );

  const [personalDataIsOpen, setPersonalDataIsOpen] = useState(false);
  const [contactIsOpen, setContactIsOpen] = useState(false);
  const [addressIsOpen, setAddressIsOpen] = useState(false);

  const [canEditContactForm, setCanEditContactForm] = useState(false);
  const [canEditAddressForm, setCanEditAddressForm] = useState(false);
  const [UFList, setUFList] = useState<TUF[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { registrationData, ufListData } = await registerData({
          codPes: user.codPes,
          numInscr: subscription?.numInscr || "",
        });

        setUserRegisterData(registrationData);
        setUFList(ufListData);
        setIsLoading(false);
      } catch (error) {
        Toast({
          message: "Erro ao carregar dados de cadastro",
          description: "Por favor tente novamente mais tarde",
          type: "danger",
          duration: 5000,
          icon: "danger",
        });

        goBack();
      }
    };

    fetchData();
  }, [user.codPes, subscription?.numInscr, goBack]);

  return (
    <DefaultLayout isLoading={isLoading} canScroll={!isLoading}>
      <Header>
        <Feather
          name="arrow-left"
          size={24}
          color={theme.colors.textPrimary}
          onPress={() => {
            goBack();
          }}
        />
        <BackPage>Dados de cadastro</BackPage>
      </Header>

      <Divisor style={{ width }} />

      {isLoading ? (
        <RegisterDataSkeleton />
      ) : (
        <Container>
          <CollapsibleItem>
            <Feather name="user" size={24} color={theme.colors.textPrimary} />
            <CollapsibleTitle>Dados pessoais</CollapsibleTitle>
            <Feather
              name={personalDataIsOpen ? "chevron-up" : "chevron-down"}
              size={24}
              color={theme.colors.textPrimary}
              onPress={() => {
                setPersonalDataIsOpen(state => !state);
              }}
              style={{ marginLeft: "auto" }}
            />
          </CollapsibleItem>

          {personalDataIsOpen && (
            <PersonalData
              userData={userRegisterData}
              // canEditForm={canEditPersonalDataForm}
              canEditForm={false}
            />
          )}

          <CollapsibleItem>
            <MaterialIcons
              name="contacts"
              size={24}
              color={theme.colors.textPrimary}
            />
            <CollapsibleTitle>Contato</CollapsibleTitle>
            {contactIsOpen &&
              (canEditContactForm ? (
                <Feather
                  name="trash-2"
                  size={20}
                  color={theme.colors.textPrimary}
                  onPress={() => {
                    setCanEditContactForm(false);
                    setContactIsOpen(false);
                  }}
                />
              ) : (
                <Feather
                  name="edit-2"
                  size={20}
                  color={theme.colors.textPrimary}
                  onPress={() => {
                    setCanEditContactForm(true);
                  }}
                />
              ))}
            <Feather
              name={contactIsOpen ? "chevron-up" : "chevron-down"}
              size={24}
              color={theme.colors.textPrimary}
              onPress={() => {
                setContactIsOpen(state => !state);
              }}
              style={{ marginLeft: "auto" }}
            />
          </CollapsibleItem>

          {contactIsOpen && (
            <Contact
              userData={{
                telFixo: userRegisterData.telFixo,
                telCelular: userRegisterData.telCelular,
                email: userRegisterData.email,
              }}
              canEditForm={canEditContactForm}
              setCanEditForm={setCanEditContactForm}
            />
          )}
          <CollapsibleItem>
            <Entypo
              name="location-pin"
              size={24}
              color={theme.colors.textPrimary}
            />
            <CollapsibleTitle>Endereço</CollapsibleTitle>
            {addressIsOpen &&
              (canEditAddressForm ? (
                <Feather
                  name="trash-2"
                  size={20}
                  color={theme.colors.textPrimary}
                  onPress={() => {
                    setCanEditAddressForm(false);
                    setAddressIsOpen(false);
                  }}
                />
              ) : (
                <Feather
                  name="edit-2"
                  size={20}
                  color={theme.colors.textPrimary}
                  onPress={() => {
                    setCanEditAddressForm(true);
                  }}
                />
              ))}
            <Feather
              name={addressIsOpen ? "chevron-up" : "chevron-down"}
              size={24}
              color={theme.colors.textPrimary}
              onPress={() => {
                setAddressIsOpen(state => !state);
              }}
              style={{ marginLeft: "auto" }}
            />
          </CollapsibleItem>

          {addressIsOpen && (
            <Address
              userData={userRegisterData.endereco}
              canEditForm={canEditAddressForm}
              setCanEditForm={setCanEditAddressForm}
              UFList={UFList}
            />
          )}
        </Container>
      )}
    </DefaultLayout>
  );
}
