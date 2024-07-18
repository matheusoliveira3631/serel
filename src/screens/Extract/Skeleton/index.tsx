import AnimatedLinearGradientComponent from "../../../components/AnimatedLinearGradientComponent";
import { useTheme } from "../../../hooks/theme";
import {
  SelectSkt,
  SelectInterSkt,
  ViewButtonsSkt,
  ViewLastContributeSkt,
  LastContributeTitleSkt,
  LastContributeCardSkt,
  LastContributeCardOneSkt,
  LastContributeCardTwoSkt,
  LastContributeCardFooterContentSkt,
} from "./styles";

export default function DashboardSkeleton() {
  const { theme } = useTheme();

  const colorsOptionsLinearGradient = {
    tertiaryToPrimary: [
      theme.colors.tertiary,
      theme.colors.primary,
      theme.colors.tertiary,
    ],
    secondaryToPrimary: [
      theme.colors.secondary,
      theme.colors.primary,
      theme.colors.secondary,
    ],
  };

  return (
    <>
      <SelectSkt>
        <AnimatedLinearGradientComponent
          colors={colorsOptionsLinearGradient.secondaryToPrimary}
        />
        <SelectInterSkt>
          <AnimatedLinearGradientComponent
            colors={colorsOptionsLinearGradient.secondaryToPrimary}
          />
        </SelectInterSkt>
      </SelectSkt>

      <ViewButtonsSkt>
        <AnimatedLinearGradientComponent
          colors={colorsOptionsLinearGradient.secondaryToPrimary}
        />
      </ViewButtonsSkt>

      <ViewLastContributeSkt>
        <LastContributeTitleSkt>
          <AnimatedLinearGradientComponent
            colors={colorsOptionsLinearGradient.secondaryToPrimary}
          />
        </LastContributeTitleSkt>

        <LastContributeCardSkt>
          <AnimatedLinearGradientComponent
            colors={colorsOptionsLinearGradient.tertiaryToPrimary}
          />
          <LastContributeCardOneSkt>
            <AnimatedLinearGradientComponent
              colors={colorsOptionsLinearGradient.secondaryToPrimary}
            />
          </LastContributeCardOneSkt>

          <LastContributeCardOneSkt>
            <AnimatedLinearGradientComponent
              colors={colorsOptionsLinearGradient.secondaryToPrimary}
            />
          </LastContributeCardOneSkt>

          <LastContributeCardOneSkt>
            <AnimatedLinearGradientComponent
              colors={colorsOptionsLinearGradient.secondaryToPrimary}
            />
          </LastContributeCardOneSkt>

          <LastContributeCardOneSkt>
            <AnimatedLinearGradientComponent
              colors={colorsOptionsLinearGradient.secondaryToPrimary}
            />
          </LastContributeCardOneSkt>

          <LastContributeCardOneSkt>
            <AnimatedLinearGradientComponent
              colors={colorsOptionsLinearGradient.secondaryToPrimary}
            />
          </LastContributeCardOneSkt>

          <LastContributeCardOneSkt>
            <AnimatedLinearGradientComponent
              colors={colorsOptionsLinearGradient.secondaryToPrimary}
            />
          </LastContributeCardOneSkt>

          <LastContributeCardOneSkt>
            <AnimatedLinearGradientComponent
              colors={colorsOptionsLinearGradient.secondaryToPrimary}
            />
          </LastContributeCardOneSkt>
        </LastContributeCardSkt>
      </ViewLastContributeSkt>
    </>
  );
}
