import { Dimensions, View, FlatList, PixelRatio } from "react-native";

import { format } from "date-fns";

import { ContributionBalancePerAccount } from "../../../../services/routes/screens/dashboard";
import formatNumber from "../../../../utils/formatNumber";
import {
  ContributionCard,
  Title,
  Label,
  BalanceLabel,
  Value,
  Quota,
  InsideCard,
  ValueView,
  Footer,
  DateText,
} from "./styles";

const { width } = Dimensions.get("window");

interface ICarouselItemProps {
  item: ContributionBalancePerAccount;
  index: number;
}

interface ICarouselContributionProps {
  canSee: boolean;
  cardsInfo: ContributionBalancePerAccount[];
}

export default function CarouselContribution({
  canSee,
  cardsInfo,
}: ICarouselContributionProps) {
  const tamanhoFonte = 16 * PixelRatio.getFontScale();

  const carouselItem = ({ item, index }: ICarouselItemProps) => {
    const styleForCard = () => {
      if (index === cardsInfo.length - 1) {
        return { marginRight: 24, width: width * 0.72 };
      }

      return {
        width: width * 0.72,
      };
    };

    return (
      <ContributionCard style={styleForCard()}>
        <View>
          <Title>{item.conta}</Title>
        </View>
        <InsideCard>
          <BalanceLabel>Saldo</BalanceLabel>
          <ValueView>
            <Label>R$</Label>
            {canSee ? (
              <Value>
                {formatNumber({
                  data: item.saldoReais,
                  type: "currencyWithoutRS",
                })}
              </Value>
            ) : (
              <Value>••••••</Value>
            )}
          </ValueView>
          <Footer>
            <Label>Cotas:</Label>
            <Quota style={tamanhoFonte > 18 && { width: 96 }}>
              {canSee
                ? formatNumber({
                    data: item.qtdCotas,
                    type: "currencyWithoutRS",
                  })
                : "••••••"}
            </Quota>
            <DateText>{format(new Date(item.data), "MM/yyyy")}</DateText>
          </Footer>
        </InsideCard>
      </ContributionCard>
    );
  };

  return (
    <View>
      <FlatList
        data={cardsInfo}
        keyExtractor={() => String(Math.random())}
        showsHorizontalScrollIndicator={false}
        horizontal
        scrollEventThrottle={16}
        decelerationRate="fast"
        snapToAlignment="start"
        // eslint-disable-next-line react/no-unstable-nested-components
        ItemSeparatorComponent={() => <View style={{ padding: 12 }} />}
        snapToOffsets={Array(cardsInfo.length)
          .fill({})
          .map((_, index) => index * (width * 0.72 + 24))}
        renderItem={carouselItem}
      />
    </View>
  );
}
