import { ReactNode, useState } from "react";
import { ImageBackground } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { useRoute } from "@react-navigation/native";

import bgHomeAccessDark from "../../../assets/bg-homeaccess-dark.png";
import bgHomeAccessLight from "../../../assets/bg-homeaccess-light.png";
import BottomSheetDoubts from "../../components/BottomSheet/BottomSheetDoubts";
import NeedHelp from "../../components/NeedHelp";
import { useTheme } from "../../hooks/theme";
import { Container, ScrollView, Wrapper } from "./styles";

interface IDefaultLayoutProps {
  children: ReactNode;
  canScroll?: boolean;
  isLoading?: boolean;
}

export default function DefaultLayout({
  children,
  canScroll = true,
  isLoading = false,
}: IDefaultLayoutProps) {
  const route = useRoute();
  const { theme } = useTheme();

  const [isVisible, setIsVisible] = useState(false);

  if (route.name === "login" || route.name === "forget-password") {
    return (
      <ImageBackground
        source={theme.title === "dark" ? bgHomeAccessDark : bgHomeAccessLight}
        style={{
          width: "100%",
          height: "100%",
          top: 0,
          left: 0,
        }}
        resizeMode="cover"
      >
        {children}
      </ImageBackground>
    );
  }

  return (
    <SafeAreaView
      style={{
        backgroundColor: theme.colors.background,
        flex: 1,
      }}
    >
      <ScrollView
        scrollEnabled={canScroll}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ flexGrow: 1 }}
      >
        <Container>
          <Wrapper>{children}</Wrapper>
        </Container>

        {!isLoading && <NeedHelp setIsVisible={setIsVisible} />}
      </ScrollView>

      <BottomSheetDoubts isVisible={isVisible} setIsVisible={setIsVisible} />
    </SafeAreaView>
  );
}
