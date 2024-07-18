import styled, { css } from "styled-components/native";

interface IThemeProps {
  themeType: "light" | "dark";
}

export const Container = styled.View``;

export const Title = styled.Text`
  color: ${({ theme }) => theme.colors.textPrimary};
  font-size: 16px;
  font-weight: 500;
  line-height: 18px;
`;
export const Description = styled.Text`
  color: ${({ theme }) => theme.colors.textPrimary};
  font-size: 12px;
  margin-bottom: 16px;
`;

export const ThemesView = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
  flex: 2;
  margin-bottom: 32px;
`;

export const ThemeItem = styled.TouchableOpacity`
  display: flex;
  align-items: flex-start;
  gap: 4px;
  flex: 1;
`;

export const ThemeTitle = styled.Text`
  color: ${({ theme }) => theme.colors.textPrimary};
  font-size: 12px;
`;

export const ThemeContainer = styled.View<IThemeProps>`
  height: 72px;
  width: 100%;
  border-radius: 16px;
  padding: 16px;

  display: flex;
  flex-direction: row;
  gap: 8px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);

  ${({ themeType }) =>
    themeType === "light"
      ? css`
          background-color: #e4e4e7;
        `
      : css`
          background-color: #103b52;
        `}
`;

export const Circle = styled.View<IThemeProps>`
  width: 40px;
  height: 40px;
  border-radius: 100px;

  ${({ themeType }) =>
    themeType === "light"
      ? css`
          background-color: #026a94;
        `
      : css`
          background-color: #0c2e40;
        `}
`;

export const RightTexts = styled.View`
  gap: 8px;
  flex: 1;
`;

export const TextOne = styled.View<IThemeProps>`
  width: 32px;
  height: 12px;
  border-radius: 8px;

  ${({ themeType }) =>
    themeType === "light"
      ? css`
          background-color: #026a94;
        `
      : css`
          background-color: #0c2e40;
        `}
`;

export const TextTwo = styled.View<IThemeProps>`
  width: 100%;
  height: 12px;
  border-radius: 8px;

  ${({ themeType }) =>
    themeType === "light"
      ? css`
          background-color: #026a94;
        `
      : css`
          background-color: #0c2e40;
        `}
`;

export const AutomaticTheme = styled.Text`
  color: ${({ theme }) => theme.colors.textPrimary};
  font-size: 14px;
  font-weight: 500;
  text-transform: uppercase;
`;
