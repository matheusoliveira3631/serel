import { useCallback, useEffect, useState } from "react";

import { Feather, Entypo } from "@expo/vector-icons";

import BottomSheetPeriod from "../../components/BottomSheet/BottomSheetPeriod";
import BottomSheetSubscription from "../../components/BottomSheet/BottomSheetSubscription";
import BottomSheetUser from "../../components/BottomSheet/BottomSheetUser";
import Toast from "../../components/Toast";
import { useAuth } from "../../hooks/auth";
import { TSubscription, useSubscription } from "../../hooks/subscriptions";
import { useTheme } from "../../hooks/theme";
import dashboard from "../../services/routes/screens/dashboard";
import {
  TContribution,
  TContributionEvolution,
  TLastContribution,
} from "../../services/routes/screens/resources/resources";
import DefaultLayout from "../../theme/DefaultLayout";
import ButtonsForNavigation from "./components/ButtonsForNavigation";
import CarouselContribution from "./components/CarouselContribution";
import CollectionEvolution from "./components/CollectionEvolution";
import CollectionEvolutionWatched from "./components/CollectionEvolutionWatched";
import LastContribute from "./components/LastContribute";
import DashboardSkeleton from "./Skeleton";
import {
  Header,
  UserInfo,
  Welcome,
  UserName,
  ViewIcons,
  SelectEnrollment,
  SelectEnrollmentBold,
  SelectEnrollmentNumber,
} from "./styles";

type DashboardDataType = {
  contribution: TContribution;
  contributionEvolution: TContributionEvolution[];
  lastContribution: TLastContribution;
};

export default function Dashboard() {
  const [isLoading, setIsLoading] = useState(true);

  // ESCONDER OU NÃO INFORMAÇÕES
  const [canSee, setCanSee] = useState(true);
  const [userInfoIsVisible, setUserInfoIsVisible] = useState(false);

  // PERÍODO DE ARRECADAÇÃO
  const [selectPeriodIsVisible, setSelectPeriodIsVisible] = useState(false);
  const [selectedPeriod, setSelectedPeriod] = useState<"5" | "6" | "7" | "8">(
    "5",
  );

  // INSCRIÇÃO
  const [selectEnrollmentIsVisible, setSelectEnrollmentIsVisible] =
    useState(false);

  const [dashboardData, setDashboardData] = useState<DashboardDataType>(
    {} as DashboardDataType,
  );

  const { theme } = useTheme();
  const { user, onlyBack } = useAuth();
  const { subscription, setSubscription } = useSubscription();

  const handleChangeSubscription = useCallback(
    (subscriptionSelected: TSubscription) => {
      if (subscriptionSelected.numInscr !== subscription?.numInscr) {
        setIsLoading(true);
        setSubscription(subscriptionSelected);
      }

      setSelectEnrollmentIsVisible(false);
    },
    [setSubscription, subscription?.numInscr],
  );

  useEffect(() => {
    async function fetchData() {
      if (!subscription) return;

      try {
        const { contributionEvolution, contribution, lastContribution } =
          await dashboard({
            codPes: user.codPes,
            codPlano: subscription.codPlano,
            numInscr: subscription.numInscr,
            situacao: subscription.situacao,
          });

        setDashboardData({
          contributionEvolution,
          contribution,
          lastContribution,
        });
        setIsLoading(false);
      } catch (error) {
        Toast({
          message: "Erro ao carregar informações",
          description: "Por favor tente novamente mais tarde",
          type: "danger",
          duration: 5000,
          icon: "danger",
        });

        onlyBack();
      }
    }

    fetchData();
  }, [subscription, user.codPes, onlyBack]);

  return (
    <>
      <DefaultLayout
        canScroll={
          !userInfoIsVisible &&
          !selectPeriodIsVisible &&
          !selectEnrollmentIsVisible &&
          !isLoading
        }
        isLoading={isLoading}
      >
        {isLoading ? (
          <DashboardSkeleton />
        ) : (
          <>
            <Header>
              <UserInfo>
                <Welcome>Bem vindo</Welcome>
                <UserName>{user.name}</UserName>
              </UserInfo>

              <ViewIcons>
                <Feather
                  name={canSee ? "eye" : "eye-off"}
                  size={24}
                  color={theme.colors.textPrimary}
                  onPress={() => {
                    setCanSee(state => !state);
                  }}
                />

                <Feather
                  name="user"
                  size={24}
                  color={theme.colors.textPrimary}
                  onPress={() => {
                    setUserInfoIsVisible(state => !state);
                  }}
                />
              </ViewIcons>
            </Header>

            <SelectEnrollment
              onPress={() => {
                setSelectEnrollmentIsVisible(true);
              }}
            >
              <SelectEnrollmentBold>INSC.:</SelectEnrollmentBold>
              <SelectEnrollmentNumber>
                {canSee ? subscription?.numInscr : "••••••"}
              </SelectEnrollmentNumber>
              <Entypo
                name="chevron-down"
                size={12}
                color={theme.colors.textSecondary}
              />
            </SelectEnrollment>

            {dashboardData.contribution.saldosPorConta.length > 0 && (
              <CarouselContribution
                canSee={canSee}
                cardsInfo={dashboardData.contribution.saldosPorConta}
              />
            )}

            <ButtonsForNavigation />

            {subscription?.situacao === "Ativo" && (
              <LastContribute
                canSee={canSee}
                lastContribution={dashboardData.lastContribution}
              />
            )}

            {subscription?.situacao === "Ativo" ? (
              <CollectionEvolution
                setIsVisible={setSelectPeriodIsVisible}
                selectedPeriod={selectedPeriod}
                contributionEvolution={dashboardData.contributionEvolution}
              />
            ) : (
              <CollectionEvolutionWatched
                contributionEvolution={dashboardData.contributionEvolution}
              />
            )}
          </>
        )}
      </DefaultLayout>

      {subscription && (
        <BottomSheetUser
          isVisible={userInfoIsVisible}
          setIsVisible={setUserInfoIsVisible}
        />
      )}

      <BottomSheetSubscription
        isVisible={selectEnrollmentIsVisible}
        setIsVisible={setSelectEnrollmentIsVisible}
        handleChangeSubscription={handleChangeSubscription}
      />

      <BottomSheetPeriod
        isVisible={selectPeriodIsVisible}
        setIsVisible={setSelectPeriodIsVisible}
        selectedPeriod={selectedPeriod}
        setSelectedPeriod={setSelectedPeriod}
      />
    </>
  );
}
