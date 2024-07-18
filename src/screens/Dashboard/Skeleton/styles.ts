import styled from "styled-components/native";

export const HeaderSkt = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 24px;

  overflow: hidden;
`;

export const ButtonHeaderSkt = styled.View`
  background-color: ${({ theme }) => theme.colors.secondary};
  border-radius: 8px;
  width: 120px;
  height: 40px;
  overflow: hidden;
`;

export const SelectSkt = styled.View`
  height: 34px;
  width: 160px;
  margin-left: auto;
  background-color: ${({ theme }) => theme.colors.secondary};
  border-radius: 10px;

  overflow: hidden;
`;

export const SelectInterSkt = styled.View`
  height: 16px;
  width: 120px;
  margin: auto;
  background-color: ${({ theme }) => theme.colors.tertiary};
  border-radius: 10px;

  overflow: hidden;
`;

export const CarouselSkt = styled.View`
  height: 140px;
  width: 100%;
  background-color: ${({ theme }) => theme.colors.secondary};
  border-radius: 16px;

  margin-top: 16px;

  overflow: hidden;
`;

export const CarouselTitleSkt = styled.View`
  background-color: ${({ theme }) => theme.colors.tertiary};
  height: 20px;
  width: 70%;
  margin: 12px 0 12px 16px;

  border-radius: 16px;

  overflow: hidden;
`;

export const InsideCarouselSkt = styled.View`
  background-color: ${({ theme }) => theme.colors.tertiary};

  width: 100%;
  height: 70%;

  border-radius: 8px;

  overflow: hidden;
`;

export const ContentCarouselSkt = styled.View`
  background-color: ${({ theme }) => theme.colors.secondary};

  width: 90%;
  height: 60%;
  border-radius: 8px;

  margin: auto;

  overflow: hidden;
`;

export const ViewButtonsSkt = styled.View`
  width: 100%;
  height: 100px;
  background-color: ${({ theme }) => theme.colors.secondary};
  border-radius: 10px;
  margin-top: 24px;

  overflow: hidden;
`;

export const ViewLastContributeSkt = styled.View``;

export const LastContributeTitleSkt = styled.View`
  width: 160px;
  height: 20px;
  background-color: ${({ theme }) => theme.colors.secondary};
  border-radius: 10px;
  margin-top: 32px;

  overflow: hidden;
`;

export const LastContributeCardSkt = styled.View`
  width: 100%;
  height: 144px;
  background-color: ${({ theme }) => theme.colors.tertiary};

  margin-top: 16px;
  border-radius: 16px;
  overflow: hidden;
`;

export const LastContributeCardContentSkt = styled.View`
  width: 90%;
  height: 70px;
  background-color: ${({ theme }) => theme.colors.secondary};

  margin: 16px auto 0 auto;

  border-radius: 10px;
  overflow: hidden;
`;

export const LastContributeCardFooterSkt = styled.View`
  width: 90%;
  height: 42px;
  background-color: ${({ theme }) => theme.colors.tertiary};

  margin: 16px auto 0 auto;

  border-radius: 16px;
  overflow: hidden;
`;

export const LastContributeCardFooterContentSkt = styled.View`
  width: 90%;
  height: 20px;
  background-color: ${({ theme }) => theme.colors.tertiary};

  margin: 10px auto 10px auto;

  border-radius: 16px;
  overflow: hidden;
`;
