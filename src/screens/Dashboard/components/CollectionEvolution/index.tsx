import { useEffect, useState, Dispatch, SetStateAction } from "react";
import { Dimensions, View, Text } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { LineChart } from "react-native-gifted-charts";

import { Feather, FontAwesome5 } from "@expo/vector-icons";

import { useTheme } from "../../../../hooks/theme";
import { TContributionEvolution } from "../../../../services/routes/screens/resources/resources";
import formatNumber from "../../../../utils/formatNumber";
import { ViewTitle, ViewTitleText } from "../../styles";
import {
  ViewCollectionEvolution,
  Card,
  ButtonOpenSelectPeriod,
  TextSelectPeriod,
} from "./styles";

interface ICollectionEvolutionProps {
  setIsVisible: Dispatch<SetStateAction<boolean>>;
  selectedPeriod: "5" | "6" | "7" | "8";
  contributionEvolution: TContributionEvolution[];
}

interface IYearData {
  ano: number;
  valor: number;
  valorCorrigido: number;
}

export default function CollectionEvolution({
  setIsVisible,
  selectedPeriod,
  contributionEvolution,
}: ICollectionEvolutionProps) {
  const { theme } = useTheme();
  const [filteredYears, setFilteredYear] = useState<TContributionEvolution[]>(
    [],
  );

  const maxValueArray = Math.ceil(getMaximumValue(contributionEvolution) * 1.4);

  useEffect(() => {
    const filteredYearsConst = contributionEvolution.filter(
      item => 2023 - item.ano <= Number(selectedPeriod) - 1,
    );

    setFilteredYear(filteredYearsConst);
  }, [contributionEvolution, selectedPeriod]);

  function getMaximumValue(array: IYearData[]) {
    let max = -Infinity;

    for (let i = 0; i < array.length; i++) {
      const { valor } = array[i];
      if (valor > max) {
        max = valor;
      }
    }

    if (max > 200000) {
      return Math.ceil(max / 100000) * 100000;
    }
    return Math.ceil(max / 40000) * 40000;
  }

  const valueData = filteredYears.map(item => {
    return {
      value: item.valor,
      labelComponent: () => customLabel(item.ano),
      labelTextStyle: {
        color: theme.colors.textPrimary,
        width: 60,
      },
      label: String(item.ano),
    };
  });

  const valueDataAdjusted = filteredYears.map(item => {
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
      labelsArray.push(
        formatNumber({ data: Math.ceil(value), type: "compactNumber" }),
      );
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
        <ViewTitleText>Evolução de arrecadação</ViewTitleText>
      </ViewTitle>

      <Card>
        <ScrollView
          horizontal
          style={{ height: 260, flex: 1 }}
          showsHorizontalScrollIndicator={false}
        >
          <LineChart
            areaChart
            isAnimated
            curved
            maxValue={maxValueArray}
            data2={valueData}
            data={valueDataAdjusted}
            spacing={80}
            thickness={2}
            yAxisLabelTexts={getYaxisLabels(maxValueArray, 5)}
            color1={theme.colors.backgroundButton} // Cor da linha do valor corrigido
            color2={theme.colors.backgroundButtonActions} // Cor da linha do valor
            startFillColor={theme.colors.backgroundButton} // Cor do gráfico do valor corrigido
            startFillColor2={theme.colors.backgroundButtonActions} // Cor do gráfico do valor
            startOpacity={1}
            endOpacity={0}
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
            dataPointsColor={theme.colors.backgroundButton} // Cor dos pontos do valor corrigido
            dataPointsColor2={theme.colors.textPrimary} // Cor dos pontos do valor
            textFontSize1={12}
            // textShiftY={-12}
            // textShiftX={-28}
            stripWidth={0}
            pointerConfig={{
              pointerStripHeight: 192,
              pointerStripColor: theme.colors.backgroundButton,
              pointerStripWidth: 2,
              pointerColor: theme.colors.backgroundButton,
              pointer2Color: theme.colors.textPrimary,
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
                      marginTop: 12,
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
                    {/* <Text
                      style={{
                        color: theme.colors.textPrimary,
                        fontSize: 12,
                        marginBottom: 6,
                        textAlign: "center",
                      }}
                    >
                      {items[0].label}
                    </Text> */}

                    <View
                      style={{
                        borderRadius: 16,
                      }}
                    >
                      <Text
                        style={{
                          textAlign: "center",
                          fontSize: 12,
                          width: 112,
                          backgroundColor: theme.colors.backgroundButton,
                          borderTopRightRadius: 8,
                          borderTopLeftRadius: 8,
                          color: theme.colors.textSecondary,
                          padding: 2,
                        }}
                      >
                        {`${formatNumber({
                          data: items[0].value,
                          type: "currency",
                        })}`}
                      </Text>
                      <Text
                        style={{
                          textAlign: "center",
                          fontSize: 12,
                          width: 112,
                          backgroundColor: theme.colors.backgroundButtonActions,
                          borderBottomRightRadius: 8,
                          borderBottomLeftRadius: 8,
                          padding: 1,
                          color: theme.colors.textSecondary,
                        }}
                      >
                        {`${formatNumber({
                          data: items[1].value,
                          type: "currency",
                        })}`}
                      </Text>
                    </View>
                  </View>
                );
              },
            }}
          />
        </ScrollView>
        <ButtonOpenSelectPeriod
          onPress={() => {
            setIsVisible(true);
          }}
        >
          <TextSelectPeriod>Últimos {selectedPeriod} anos</TextSelectPeriod>
          <Feather
            name="chevron-down"
            size={16}
            color={theme.colors.textPrimary}
          />
        </ButtonOpenSelectPeriod>
      </Card>
    </ViewCollectionEvolution>
  );
}
