import { ReactNode } from "react";
import { TouchableOpacityProps } from "react-native";

import LottieView from "lottie-react-native";

import loading from "../../../../assets/loading.json";
import { useTheme } from "../../../hooks/theme";
import { Container, ButtonText } from "./styles";

interface IButtonProps extends TouchableOpacityProps {
  children: ReactNode;
  isLoading?: boolean;
  type?: "PRIMARY" | "SECONDARY";
}

export default function Button({
  children,
  isLoading,
  type = "SECONDARY",
  ...rest
}: IButtonProps) {
  const { theme } = useTheme();
  return (
    <Container {...rest}>
      {isLoading && (
        <LottieView
          source={loading}
          autoPlay
          style={{ width: 60, height: 40 }}
        />
      )}
      <ButtonText
        style={
          type === "PRIMARY"
            ? { color: theme.colors.textPrimary }
            : { color: theme.colors.textSecondary }
        }
      >
        {children}
      </ButtonText>
    </Container>
  );
}
