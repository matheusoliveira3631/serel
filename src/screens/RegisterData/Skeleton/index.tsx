import { View } from "react-native-animatable";

import { Feather, MaterialIcons } from "@expo/vector-icons";

import AnimatedLinearGradientComponent from "../../../components/AnimatedLinearGradientComponent";
import { useTheme } from "../../../hooks/theme";
import { CollapsibleTitle } from "../styles";
import {
  CollapseTitleView,
  FirstLineSkt,
  OthersLinesSkt,
  SecondDivisor,
  SeparateDivisor,
  ThirdDivisor,
  ViewContent,
} from "./styles";

const data = new Array(8).fill({});
const dataSecond = new Array(3).fill({});

export default function RegisterDataSkeleton() {
  const { theme } = useTheme();

  const colorsOptionsLinearGradient = {
    secondaryToPrimary: [
      theme.colors.secondary,
      theme.colors.primary,
      theme.colors.secondary,
    ],
  };

  return (
    <ViewContent>
      <CollapseTitleView>
        <Feather name="user" size={24} color={theme.colors.textPrimary} />
        <CollapsibleTitle>Dados pessoais</CollapsibleTitle>
        <MaterialIcons
          name="keyboard-arrow-up"
          size={24}
          color={theme.colors.textPrimary}
          style={{ marginLeft: "auto" }}
        />
      </CollapseTitleView>

      <FirstLineSkt>
        <AnimatedLinearGradientComponent
          colors={colorsOptionsLinearGradient.secondaryToPrimary}
        />
      </FirstLineSkt>

      <SecondDivisor />

      {data.map(() => (
        <View key={Math.random()}>
          <OthersLinesSkt>
            <AnimatedLinearGradientComponent
              colors={colorsOptionsLinearGradient.secondaryToPrimary}
            />
          </OthersLinesSkt>
          <SeparateDivisor>
            <ThirdDivisor />
            <ThirdDivisor />
          </SeparateDivisor>
        </View>
      ))}

      {dataSecond.map(() => (
        <View key={Math.random()}>
          <OthersLinesSkt>
            <AnimatedLinearGradientComponent
              colors={colorsOptionsLinearGradient.secondaryToPrimary}
            />
          </OthersLinesSkt>

          <SecondDivisor />
        </View>
      ))}
    </ViewContent>
  );
}
