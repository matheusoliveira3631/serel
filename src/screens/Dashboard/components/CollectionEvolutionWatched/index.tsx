import { Text, View, ScrollView } from "react-native";
import { LineChart } from "react-native-gifted-charts";

import { FontAwesome5 } from "@expo/vector-icons";

import { useTheme } from "../../../../hooks/theme";
import { TContributionEvolution } from "../../../../services/routes/screens/resources/resources";
import formatNumber from "../../../../utils/formatNumber";
import { ViewTitle, ViewTitleText } from "../../styles";
import { ViewCollectionEvolution, Card } from "./styles";

interface ICollectionEvolutionPropsWatched {
  contributionEvolution: TContributionEvolution[];
}

interface IYearData {
  ano: number;
  valor: number;
  valorCorrigido: number;
}

const simulatedData: IYearData[] = [
  // {
  //   ano: 2016,
  //   valor: 2518490,
  //   valorCorrigido: 544225.25,
  // },
  // {
  //   ano: 2017,
  //   valor: 1518490,
  //   valorCorrigido: 544225.25,
  // },
  {
    ano: 2018,
    valor: 518490,
    valorCorrigido: 544225.25,
  },
  {
    ano: 2019,
    valor: 350244,
    valorCorrigido: 544225.25,
  },
  {
    ano: 2020,
    valor: 300000,
    valorCorrigido: 544225.25,
  },
  {
    ano: 2021,
    valor: 200000,
    valorCorrigido: 544225.25,
  },
  {
    ano: 2022,
    valor: 100000,
    valorCorrigido: 544225.25,
  },
  {
    ano: 2023,
    valor: 1100000,
    valorCorrigido: 544225.25,
  },
  {
    ano: 2024,
    valor: 0,
    valorCorrigido: 544225.25,
  },
];

export default function CollectionEvolutionWatched({
  contributionEvolution,
}: ICollectionEvolutionPropsWatched) {
  const { theme } = useTheme();

  const maxValueArray = Math.ceil(getMaximumValue(contributionEvolution) * 1.4);

  function getMaximumValue(array: IYearData[]) {
    let max = -Infinity;

    for (let i = 0; i < array.length; i++) {
      const { valorCorrigido } = array[i];
      if (valorCorrigido > max) {
        max = valorCorrigido;
      }
    }

    return Math.ceil(max / 100000) * 100000;
  }

  const latestData = contributionEvolution.map(item => {
    return {
      value: item.valorCorrigido,
      labelComponent: () => customLabel(item.ano),
      labelTextStyle: {
        color: theme.colors.textPrimary,
        width: 60,
      },
      label: String(item.ano),
    };
  });

  const customLabel = (value: number) => {
    return (
      <View style={{ width: 40, marginLeft: 20 }}>
        <Text
          style={{
            color: theme.colors.textPrimary,
            fontWeight: "bold",
            fontSize: 12,
          }}
        >
          {value}
        </Text>
      </View>
    );
  };

  const getYaxisLabels = (maxValue: number, noOfSteps: number) => {
    const stepValue = maxValue / noOfSteps;
    const labelsArray: string[] = [];

    for (let i = 0; i <= noOfSteps; i++) {
      const value = stepValue * i;
      labelsArray.push(formatNumber({ data: value, type: "compactNumber" }));
    }
    return labelsArray;
  };

  return (
    <ViewCollectionEvolution>
      <ViewTitle>
        <FontAwesome5
          name="chart-bar"
          size={20}
          color={theme.colors.textPrimary}
        />
        <ViewTitleText>Evolução de contribuição</ViewTitleText>
      </ViewTitle>

      <Card>
        <ScrollView
          horizontal
          style={{ height: 260 }}
          showsHorizontalScrollIndicator={false}
        >
          <LineChart
            areaChart
            isAnimated
            curved
            maxValue={maxValueArray}
            data={latestData}
            spacing={80}
            thickness={2}
            yAxisLabelTexts={getYaxisLabels(maxValueArray, 5)}
            color1={theme.colors.primary} // Cor da linha do valor corrigido
            startFillColor={theme.colors.primary}
            startOpacity={0.8}
            endFillColor={theme.colors.primary}
            endOpacity={0.4}
            yAxisColor={theme.colors.textPrimary}
            xAxisColor={theme.colors.textPrimary}
            yAxisTextStyle={{ color: theme.colors.textPrimary }}
            initialSpacing={24}
            noOfSections={5}
            verticalLinesSpacing={25}
            hideRules
            yAxisLabelContainerStyle={{
              width: 56,
              marginRight: 2,
              fontSize: 12,
            }}
            // pressEnabled
            // showStripOnPress
            // showTextOnPress
            dataPointsColor={theme.colors.primary} // Cor dos pontos
            // textFontSize1={12}
            // textShiftY={-12}
            // textShiftX={-28}
            stripWidth={0}
            pointerConfig={{
              pointerStripHeight: 200,
              pointerStripColor: theme.colors.primary,
              pointerStripWidth: 2,
              pointerColor: theme.colors.primary,
              radius: 6,
              pointerLabelWidth: 100,
              pointerLabelHeight: 90,
              activatePointersOnLongPress: false,
              autoAdjustPointerLabelPosition: false,
              // eslint-disable-next-line react/no-unstable-nested-components
              pointerLabelComponent: (items: IYearData) => {
                return (
                  <View
                    style={{
                      height: 90,
                      width: 100,
                      justifyContent: "center",
                      marginLeft:
                        items[0].label ===
                        String(
                          contributionEvolution[
                            contributionEvolution.length - 1
                          ].ano,
                        )
                          ? -48
                          : 9,
                    }}
                  >
                    <View
                      style={{
                        borderRadius: 8,
                      }}
                    >
                      <Text
                        style={{
                          textAlign: "center",
                          fontSize: 12,
                          width: 96,
                          backgroundColor: theme.colors.primary,
                          borderRadius: 8,
                          paddingVertical: 2,
                          color: theme.colors.textSecondary,
                        }}
                      >
                        {formatNumber({
                          data: items[0].value,
                          type: "currency",
                        })}
                      </Text>
                    </View>
                  </View>
                );
              },
            }}
          />
        </ScrollView>
      </Card>
    </ViewCollectionEvolution>
  );
}
