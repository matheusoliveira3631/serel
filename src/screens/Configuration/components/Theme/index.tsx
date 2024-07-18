import { useTheme } from "../../../../hooks/theme";
import {
  Circle,
  Container,
  Description,
  RightTexts,
  TextOne,
  TextTwo,
  ThemeContainer,
  ThemeItem,
  ThemesView,
  ThemeTitle,
  Title,
} from "./styles";

export default function Theme() {
  const { handleSetTheme } = useTheme();
  return (
    <Container>
      <Title>Escolha o tema de sua preferência</Title>
      <Description>
        Você também pode definir como automático e o tema do app será
        configurado de acordo com as preferências do seu smartphone.
      </Description>
      <ThemesView>
        <ThemeItem
          onPress={() => {
            handleSetTheme("dark");
          }}
        >
          <ThemeTitle>Escuro</ThemeTitle>
          <ThemeContainer themeType="dark">
            <Circle themeType="dark" />
            <RightTexts>
              <TextOne themeType="dark" />
              <TextTwo themeType="dark" />
            </RightTexts>
          </ThemeContainer>
        </ThemeItem>
        <ThemeItem
          onPress={() => {
            handleSetTheme("light");
          }}
        >
          <ThemeTitle>Claro</ThemeTitle>
          <ThemeContainer themeType="light">
            <Circle themeType="light" />
            <RightTexts>
              <TextOne themeType="light" />
              <TextTwo themeType="light" />
            </RightTexts>
          </ThemeContainer>
        </ThemeItem>
      </ThemesView>

      {/* <AutomaticTheme>Automático</AutomaticTheme> */}
    </Container>
  );
}
