import { useEffect } from "react";
import { Dimensions, StyleSheet } from "react-native";
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from "react-native-reanimated";

import { LinearGradient } from "expo-linear-gradient";

const { width } = Dimensions.get("window");

const AnimatedLinearGradient = Animated.createAnimatedComponent(LinearGradient);

interface IAnimatedLinearGradientComponentProps {
  colors: Array<string>;
}

export default function AnimatedLinearGradientComponent({
  colors,
}: IAnimatedLinearGradientComponentProps) {
  const x = useSharedValue(0);

  const rStyle = useAnimatedStyle(() => ({
    transform: [
      {
        translateX: interpolate(x.value, [0, 1], [-2 * width, 2 * width]),
      },
    ],
  }));

  useEffect(() => {
    x.value = withRepeat(withTiming(1, { duration: 2000 }), -1);
  }, [x]);

  return (
    <AnimatedLinearGradient
      colors={colors}
      style={[{ ...StyleSheet.absoluteFillObject }, rStyle]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
    />
  );
}
