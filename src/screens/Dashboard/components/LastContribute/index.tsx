import { View } from "react-native";

import { FontAwesome5 } from "@expo/vector-icons";
import dateLocalePTBR, { format } from "date-fns";

import { useTheme } from "../../../../hooks/theme";
import { TLastContribution } from "../../../../services/routes/screens/resources/resources";
import formatNumber from "../../../../utils/formatNumber";
import { ViewTitle, ViewTitleText } from "../../styles";
import {
  ViewLastContribute,
  Card,
  Title,
  Item,
  Total,
  TextSmall,
  TextMedium,
} from "./styles";

interface ILastContributeProps {
  canSee: boolean;
  lastContribution: TLastContribution;
}

export default function LastContribute({
  canSee,
  lastContribution,
}: ILastContributeProps) {
  const { theme } = useTheme();

  return (
    <ViewLastContribute>
      <ViewTitle>
        <FontAwesome5
          name="file-invoice-dollar"
          size={20}
          color={theme.colors.textPrimary}
        />
        <ViewTitleText>Última contribuição</ViewTitleText>
      </ViewTitle>

      <Card>
        <View>
          <Title>
            {format(
              lastContribution[0]?.dtRef
                ? new Date(lastContribution[0]?.dtRef)
                : new Date(),
              "MMM/yyyy",
              {
                locale: dateLocalePTBR,
              },
            )}
          </Title>

          <View>
            <ContributeItem
              title="Patrocinadores"
              amount={formatNumber({
                data: lastContribution[0]?.vlContribPatrocinadora || 0,
                type: "currencyWithoutRS",
              })}
              canSee={canSee}
            />
            <ContributeItem
              title="Participante"
              amount={formatNumber({
                data: lastContribution[0]?.vlContribParticipante || 0,
                type: "currencyWithoutRS",
              })}
              canSee={canSee}
            />
          </View>
        </View>
        <ContributeItem
          title={`Totais de ${format(
            lastContribution[0]?.dtRef
              ? new Date(lastContribution[0]?.dtRef)
              : new Date(),
            "MMM/yyyy",
            {
              locale: dateLocalePTBR,
            },
          )}`}
          amount={formatNumber({
            data: lastContribution[0]?.vlContribTotal || 0,
            type: "currencyWithoutRS",
          })}
          canSee={canSee}
          total
        />
      </Card>
    </ViewLastContribute>
  );
}

interface IContributeItem {
  title: string;
  amount: string;
  canSee: boolean;
  total?: boolean;
}

function ContributeItem({
  title,
  amount,
  canSee,
  total = false,
}: IContributeItem) {
  const { theme } = useTheme();
  if (!total) {
    return (
      <Item>
        <TextSmall>{title}</TextSmall>
        <TextSmall>
          R$ {canSee ? <TextMedium>{amount}</TextMedium> : <>••••••</>}
        </TextSmall>
      </Item>
    );
  }
  return (
    <Total>
      <TextSmall style={{ color: theme.colors.textSecondary }}>
        {title}
      </TextSmall>
      <TextSmall style={{ color: theme.colors.textSecondary }}>
        R${" "}
        {canSee ? (
          <TextMedium style={{ color: theme.colors.textSecondary }}>
            {amount}
          </TextMedium>
        ) : (
          <>••••••</>
        )}
      </TextSmall>
    </Total>
  );
}
