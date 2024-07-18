import { useCallback, useEffect, useState } from "react";
import { Dimensions, FlatList } from "react-native";

import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { subYears } from "date-fns";

import BottomSheetPeriodExtract from "../../components/BottomSheet/BottomSheetPeriodExtract";
import BottomSheetSubscription from "../../components/BottomSheet/BottomSheetSubscription";
import Toast from "../../components/Toast";
import { useAuth } from "../../hooks/auth";
import { TSubscription, useSubscription } from "../../hooks/subscriptions";
import { useTheme } from "../../hooks/theme";
import extract from "../../services/routes/screens/extract";
import {
  TContribution,
  TSubscriptionExtract,
} from "../../services/routes/screens/resources/resources";
import DefaultLayout from "../../theme/DefaultLayout";
import { Header, BackPage, Divisor } from "../../theme/DefaultLayout/styles";
import formatNumber from "../../utils/formatNumber";
import CarouselContribution from "../Dashboard/components/CarouselContribution";
import ExtractHistory from "./components/ExtractHistory";
import DashboardSkeleton from "./Skeleton";
import {
  Container,
  SelectEnrollment,
  SelectEnrollmentBold,
  SelectEnrollmentNumber,
  ValuesItem,
  DivisorList,
  ValuesText,
  ValuesLabel,
} from "./styles";

export type FilterDateType = {
  initialDate: Date;
  finalDate: Date;
};

type ExtractDataType = {
  subscriptionExtract: TSubscriptionExtract;
  contribution: TContribution;
};

const { width } = Dimensions.get("window");

export default function Extract() {
  const { user } = useAuth();
  const { theme } = useTheme();
  const { goBack } = useNavigation();
  const { subscription, setSubscription } = useSubscription();

  // LOADINGS
  const [isLoading, setIsLoading] = useState(true);
  const [isWaitingFilterExtract, setIsWaitingFilterExtract] = useState(false);

  // BOTTOM SHEET VISIBILITY
  const [selectPeriodIsVisible, setSelectPeriodIsVisible] = useState(false);
  const [selectEnrollmentIsVisible, setSelectEnrollmentIsVisible] =
    useState(false);

  // HIDE OR NOT THE INFORMATION
  const [canSee, setCanSee] = useState(true);

  // FILTER FOR EXTRACT
  const [selectedPeriod, setSelectedPeriod] = useState<
    "6" | "1" | "2" | "custom"
  >("1");
  const [filterDate, setFilterDate] = useState<FilterDateType>({
    initialDate: subYears(new Date(), 1),
    finalDate: new Date(),
  });

  const [extractData, setExtractData] = useState<ExtractDataType>(
    {} as ExtractDataType,
  );

  const carouselExtractBalance = [
    {
      label: "Valor da cota",
      value: `R$ ${formatNumber({
        data: extractData.subscriptionExtract?.saldo.valorCota,
        type: "currencyWithoutRS",
      })}`,
    },
    {
      label: "Qtde participante",
      value: formatNumber({
        data: extractData.subscriptionExtract?.saldo.qtdCotasParticipante,
        type: "currencyWithoutRS",
      }),
    },
    {
      label: "Total participante",
      value: formatNumber({
        data: extractData.subscriptionExtract?.saldo.sldParticipante,
        type: "currency",
      }),
    },
    {
      label: "Qtde Patrocinadora",
      value: formatNumber({
        data: extractData.subscriptionExtract?.saldo.qtdCotasPatrocinadora,
        type: "currencyWithoutRS",
      }),
    },
    {
      label: "Total patrocinadora",
      value: formatNumber({
        data: extractData.subscriptionExtract?.saldo.sldPatrocinadora,
        type: "currency",
      }),
    },
    {
      label: "Qtde total",
      value: formatNumber({
        data: extractData.subscriptionExtract?.saldo.qtdCotasTotal,
        type: "currencyWithoutRS",
      }),
    },
    {
      label: "Saldo total",
      value: formatNumber({
        data: extractData.subscriptionExtract?.saldo.sldTotal,
        type: "currency",
      }),
    },
  ];

  const handleChangeFilterDate = (initial: Date, final?: Date) => {
    setIsWaitingFilterExtract(true);

    if (!final) {
      return setFilterDate(state => ({
        ...state,
        initialDate: initial,
      }));
    }

    return setFilterDate({
      initialDate: initial,
      finalDate: final,
    });
  };

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
    const fetchData = async () => {
      if (!subscription) return;

      try {
        const { subscriptionExtract, contribution } = await extract({
          codPes: user.codPes,
          codPlano: subscription.codPlano,
          numInscr: subscription.numInscr,
          exercicio: 2,
          mesAnoIni: filterDate.initialDate,
          mesAnoFin: filterDate.finalDate,
          isActiveStatus: !!subscription.processo,
        });

        setExtractData({
          subscriptionExtract,
          contribution,
        });

        setIsWaitingFilterExtract(false);
        setIsLoading(false);
      } catch (error) {
        Toast({
          message: "Erro ao carregar extrato",
          description: "Por favor tente novamente mais tarde",
          type: "danger",
          duration: 5000,
          icon: "danger",
        });

        goBack();
      }
    };

    fetchData();
  }, [
    filterDate.initialDate,
    filterDate.finalDate,
    subscription,
    user.codPes,
    goBack,
  ]);

  return (
    <>
      <DefaultLayout
        canScroll={
          !selectPeriodIsVisible && !selectEnrollmentIsVisible && !isLoading
        }
        isLoading={isLoading}
      >
        <Header>
          <Feather
            name="arrow-left"
            size={24}
            color={theme.colors.textPrimary}
            onPress={() => {
              goBack();
            }}
          />
          <BackPage>
            {subscription?.processo === null
              ? "Saldo e extrato"
              : "Saldo beneficiário"}
          </BackPage>

          <Feather
            name={canSee ? "eye" : "eye-off"}
            size={24}
            color={theme.colors.textPrimary}
            onPress={() => {
              setCanSee(state => !state);
            }}
            style={{ marginLeft: "auto" }}
          />
        </Header>

        <Divisor style={{ width }} />

        {isLoading ? (
          <DashboardSkeleton />
        ) : (
          <Container>
            <SelectEnrollment
              style={{ marginTop: 0 }}
              onPress={() => {
                setSelectEnrollmentIsVisible(state => !state);
              }}
            >
              <SelectEnrollmentBold>Insc.:</SelectEnrollmentBold>
              <SelectEnrollmentNumber>
                {canSee ? subscription?.numInscr : "••••••"}
              </SelectEnrollmentNumber>
              <Feather
                name="chevron-down"
                size={16}
                color={theme.colors.textSecondary}
              />
            </SelectEnrollment>

            <FlatList
              data={carouselExtractBalance}
              horizontal
              renderItem={({ item }) => (
                <ValuesItem>
                  <ValuesText>{canSee ? item.value : "••••••"}</ValuesText>
                  <ValuesLabel>{item.label}</ValuesLabel>
                </ValuesItem>
              )}
              ItemSeparatorComponent={DivisorList}
              scrollEnabled
              showsHorizontalScrollIndicator={false}
            />

            {extractData.contribution.saldosPorConta.length > 0 && (
              <CarouselContribution
                canSee={canSee}
                cardsInfo={extractData.contribution.saldosPorConta}
              />
            )}

            <ExtractHistory
              canSee={canSee}
              extract={extractData.subscriptionExtract}
              setIsVisible={setSelectPeriodIsVisible}
              isLoading={isWaitingFilterExtract}
            />
          </Container>
        )}
      </DefaultLayout>

      <BottomSheetPeriodExtract
        isVisible={selectPeriodIsVisible}
        setIsVisible={setSelectPeriodIsVisible}
        selectedPeriod={selectedPeriod}
        setSelectedPeriod={setSelectedPeriod}
        handleChange={handleChangeFilterDate}
      />

      <BottomSheetSubscription
        isVisible={selectEnrollmentIsVisible}
        setIsVisible={setSelectEnrollmentIsVisible}
        handleChangeSubscription={handleChangeSubscription}
      />
    </>
  );
}
