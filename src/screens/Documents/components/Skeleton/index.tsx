import { Feather, MaterialIcons } from "@expo/vector-icons";

import AnimatedLinearGradientComponent from "../../../../components/AnimatedLinearGradientComponent";
import { useTheme } from "../../../../hooks/theme";
import { ViewContent, CollapseTitleView, CollapseTitle } from "../../styles";
import { FirstLineSkt } from "./styles";

export default function DocumentsSkeleton() {
  const { theme } = useTheme();

  const colorsOptionsLinearGradient = {
    nonaryToQuaternary: [
      theme.colors.secondary,
      theme.colors.primary,
      theme.colors.secondary,
    ],
  };

  return (
    <ViewContent>
      <CollapseTitleView>
        <Feather name="file-text" size={24} color={theme.colors.textPrimary} />
        <CollapseTitle>Documentos para download</CollapseTitle>
        <MaterialIcons
          name="keyboard-arrow-up"
          size={24}
          color={theme.colors.textPrimary}
          style={{ marginLeft: "auto" }}
        />
      </CollapseTitleView>

      <FirstLineSkt>
        <AnimatedLinearGradientComponent
          colors={colorsOptionsLinearGradient.nonaryToQuaternary}
        />
      </FirstLineSkt>

      <FirstLineSkt>
        <AnimatedLinearGradientComponent
          colors={colorsOptionsLinearGradient.nonaryToQuaternary}
        />
      </FirstLineSkt>

      <CollapseTitleView>
        <Feather name="file-text" size={24} color={theme.colors.textPrimary} />
        <CollapseTitle>ATAS - Conselho Deliberativo</CollapseTitle>
        <MaterialIcons
          name="keyboard-arrow-down"
          size={24}
          color={theme.colors.textPrimary}
          style={{ marginLeft: "auto" }}
        />
      </CollapseTitleView>

      <CollapseTitleView>
        <Feather name="file-text" size={24} color={theme.colors.textPrimary} />
        <CollapseTitle>ATAS - Conselho Fiscal</CollapseTitle>
        <MaterialIcons
          name="keyboard-arrow-down"
          size={24}
          color={theme.colors.textPrimary}
          style={{ marginLeft: "auto" }}
        />
      </CollapseTitleView>
    </ViewContent>
  );
}
