import AnimatedLinearGradientComponent from "../../../components/AnimatedLinearGradientComponent";
import { useTheme } from "../../../hooks/theme";
import {
  HeaderSkt,
  ButtonHeaderSkt,
  SelectSkt,
  SelectInterSkt,
  CarouselSkt,
  CarouselTitleSkt,
  InsideCarouselSkt,
  ContentCarouselSkt,
  ViewButtonsSkt,
  ViewLastContributeSkt,
  LastContributeTitleSkt,
  LastContributeCardSkt,
  LastContributeCardContentSkt,
  LastContributeCardFooterSkt,
  LastContributeCardFooterContentSkt,
} from "./styles";

export default function DashboardSkeleton() {
  const { theme } = useTheme();

  const colorsOptionsLinearGradient = {
    primaryToTertiary: [
      theme.colors.tertiary,
      theme.colors.primary,
      theme.colors.tertiary,
    ],
    primaryToSecondary: [
      theme.colors.secondary,
      theme.colors.primary,
      theme.colors.secondary,
    ],
  };

  return (
    <>
      <HeaderSkt>
        <ButtonHeaderSkt>
          <AnimatedLinearGradientComponent
            colors={colorsOptionsLinearGradient.primaryToSecondary}
          />
        </ButtonHeaderSkt>

        <ButtonHeaderSkt>
          <AnimatedLinearGradientComponent
            colors={colorsOptionsLinearGradient.primaryToSecondary}
          />
        </ButtonHeaderSkt>
      </HeaderSkt>

      <SelectSkt>
        <AnimatedLinearGradientComponent
          colors={colorsOptionsLinearGradient.primaryToSecondary}
        />
        <SelectInterSkt>
          <AnimatedLinearGradientComponent
            colors={colorsOptionsLinearGradient.primaryToTertiary}
          />
        </SelectInterSkt>
      </SelectSkt>

      <CarouselSkt>
        <AnimatedLinearGradientComponent
          colors={colorsOptionsLinearGradient.primaryToSecondary}
        />
        <CarouselTitleSkt>
          <AnimatedLinearGradientComponent
            colors={colorsOptionsLinearGradient.primaryToTertiary}
          />
        </CarouselTitleSkt>

        <InsideCarouselSkt>
          <AnimatedLinearGradientComponent
            colors={colorsOptionsLinearGradient.primaryToTertiary}
          />
          <ContentCarouselSkt>
            <AnimatedLinearGradientComponent
              colors={colorsOptionsLinearGradient.primaryToSecondary}
            />
          </ContentCarouselSkt>
        </InsideCarouselSkt>
      </CarouselSkt>

      <ViewButtonsSkt>
        <AnimatedLinearGradientComponent
          colors={colorsOptionsLinearGradient.primaryToSecondary}
        />
      </ViewButtonsSkt>

      <ViewLastContributeSkt>
        <LastContributeTitleSkt>
          <AnimatedLinearGradientComponent
            colors={colorsOptionsLinearGradient.primaryToSecondary}
          />
        </LastContributeTitleSkt>

        <LastContributeCardSkt>
          <AnimatedLinearGradientComponent
            colors={colorsOptionsLinearGradient.primaryToTertiary}
          />
          <LastContributeCardContentSkt>
            <AnimatedLinearGradientComponent
              colors={colorsOptionsLinearGradient.primaryToSecondary}
            />
          </LastContributeCardContentSkt>

          <LastContributeCardFooterSkt>
            <AnimatedLinearGradientComponent
              colors={colorsOptionsLinearGradient.primaryToTertiary}
            />
            <LastContributeCardFooterContentSkt>
              <AnimatedLinearGradientComponent
                colors={colorsOptionsLinearGradient.primaryToTertiary}
              />
            </LastContributeCardFooterContentSkt>
          </LastContributeCardFooterSkt>
        </LastContributeCardSkt>
      </ViewLastContributeSkt>
    </>
  );
}
