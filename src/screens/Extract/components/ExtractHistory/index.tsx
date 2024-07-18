import { Dispatch, SetStateAction } from "react";
import { View } from "react-native-animatable";

import { Entypo, Feather, FontAwesome5, Ionicons } from "@expo/vector-icons";
import { format } from "date-fns";

import Loading from "../../../../components/Loading";
import { useSubscription } from "../../../../hooks/subscriptions";
import { useTheme } from "../../../../hooks/theme";
import { TSubscriptionExtract } from "../../../../services/routes/screens/resources/resources";
import formatNumber from "../../../../utils/formatNumber";
import {
  SelectEnrollment,
  SelectEnrollmentBold,
  ViewTitle,
  ViewTitleText,
} from "../../styles";
import {
  ViewExtract,
  Card,
  ViewItem,
  ViewForTwoItems,
  ViewLine,
  Label,
  TextStyle,
  EmptyExtractsContainer,
} from "./styles";

interface IExtractHistoryProps {
  canSee: boolean;
  extract: TSubscriptionExtract;
  setIsVisible: Dispatch<SetStateAction<boolean>>;
  isLoading: boolean;
}

export default function ExtractHistory({
  canSee,
  extract,
  setIsVisible,
  isLoading,
}: IExtractHistoryProps) {
  const { theme } = useTheme();

  const { subscription } = useSubscription();

  const extractHistory = extract.itens.map((item, index) => {
    return {
      id: String(Math.random()),
      competence: extract.movimento[index].mesAnoCompetencia,
      historic: item.historico,
      numberOfQuotas: formatNumber({
        data: item.qtdCotas,
        type: "currencyWithoutRS",
      }),
      appropriation: format(new Date(item.dtApropriacao), "MM/yyyy"),
      cOrD: item.tipoOperacao,
      value: formatNumber({
        data: extract.movimento[index].valor,
        type: "currency",
      }),
    };
  });

  return (
    <ViewExtract>
      <ViewTitle>
        <FontAwesome5
          name="file-invoice-dollar"
          size={20}
          color={theme.colors.textPrimary}
        />
        <ViewTitleText>Extrato</ViewTitleText>

        {subscription?.processo === null && (
          <SelectEnrollment
            onPress={() => {
              setIsVisible(state => !state);
            }}
          >
            <SelectEnrollmentBold>Período</SelectEnrollmentBold>
            <Entypo
              name="chevron-down"
              size={12}
              color={theme.colors.textSecondary}
            />
          </SelectEnrollment>
        )}
      </ViewTitle>

      {isLoading ? (
        <View
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
            height: 120,
          }}
        >
          <Loading />
        </View>
      ) : (
        <Card>
          {extractHistory.length === 0 && <EmptyExtract />}

          {extractHistory.map((item, index) => (
            <ViewItem
              key={item.id}
              style={
                index % 2 === 0
                  ? { backgroundColor: theme.colors.tertiary }
                  : { backgroundColor: theme.colors.secondary }
              }
            >
              <ViewForTwoItems>
                <ViewLine>
                  <Label hasColorDiff={index % 2 !== 0}>Competência:</Label>
                  <TextStyle hasColorDiff={index % 2 !== 0}>
                    {canSee ? item.competence : "••••••"}
                  </TextStyle>
                </ViewLine>

                <ViewLine style={{ justifyContent: "flex-end" }}>
                  <Label hasColorDiff={index % 2 !== 0}>Apropriação:</Label>
                  <TextStyle
                    style={{ textAlign: "right" }}
                    hasColorDiff={index % 2 !== 0}
                  >
                    {canSee ? item.appropriation : "••••••"}
                  </TextStyle>
                </ViewLine>
              </ViewForTwoItems>

              <ViewForTwoItems style={{ flex: 5 }}>
                <ViewLine style={{ flexDirection: "column" }}>
                  <Label hasColorDiff={index % 2 !== 0}>Histórico:</Label>
                  <TextStyle
                    style={{ textTransform: "uppercase" }}
                    hasColorDiff={index % 2 !== 0}
                  >
                    {item.historic}
                  </TextStyle>
                </ViewLine>

                <ViewLine style={{ justifyContent: "flex-end" }}>
                  <Label hasColorDiff={index % 2 !== 0}>C/D:</Label>
                  <TextStyle hasColorDiff={index % 2 !== 0}>
                    {canSee ? item.cOrD : "••"}
                  </TextStyle>
                </ViewLine>
              </ViewForTwoItems>

              <ViewForTwoItems>
                <ViewLine>
                  <Label hasColorDiff={index % 2 !== 0}>Qtde de Quotas:</Label>
                  <TextStyle hasColorDiff={index % 2 !== 0}>
                    {canSee ? item.numberOfQuotas : "••••••"}
                  </TextStyle>
                </ViewLine>

                <ViewLine style={{ justifyContent: "flex-end" }}>
                  <Label hasColorDiff={index % 2 !== 0}>Valor:</Label>
                  <TextStyle hasColorDiff={index % 2 !== 0}>
                    {canSee ? item.value : "••••••"}
                  </TextStyle>
                </ViewLine>
              </ViewForTwoItems>
            </ViewItem>
          ))}
        </Card>
      )}
    </ViewExtract>
  );
}

function EmptyExtract() {
  const { theme } = useTheme();

  return (
    <EmptyExtractsContainer>
      <TextStyle
        hasColorDiff
        style={{
          fontSize: 20,
        }}
      >
        Nenhum extrato encontrado
      </TextStyle>
      <Ionicons name="file-tray" size={40} color={theme.colors.textSecondary} />
    </EmptyExtractsContainer>
  );
}
