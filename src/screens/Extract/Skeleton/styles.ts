import styled from "styled-components/native";

export const SelectSkt = styled.View`
  height: 34px;
  width: 160px;
  margin-left: auto;
  background-color: ${({ theme }) => theme.colors.secondary};
  border-radius: 10px;
  margin-top: 16px;

  overflow: hidden;
`;

export const SelectInterSkt = styled.View`
  height: 16px;
  width: 120px;
  margin: auto;
  background-color: ${({ theme }) => theme.colors.secondary};
  border-radius: 10px;

  overflow: hidden;
`;

export const ViewButtonsSkt = styled.View`
  width: auto;
  height: 74px;
  background-color: ${({ theme }) => theme.colors.secondary};
  border-radius: 10px;
  margin-top: 24px;

  overflow: hidden;
`;

export const ViewLastContributeSkt = styled.View``;

export const LastContributeTitleSkt = styled.View`
  width: 90px;
  height: 40px;
  background-color: ${({ theme }) => theme.colors.secondary};
  border-radius: 8px;
  margin-top: 32px;
  margin-left: auto;

  overflow: hidden;
`;

export const LastContributeCardSkt = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.tertiary};

  margin-top: 16px;
  border-radius: 16px;
  overflow: hidden;
`;

export const LastContributeCardOneSkt = styled.View`
  width: 92%;
  height: 70px;
  background-color: ${({ theme }) => theme.colors.secondary};

  margin: 16px auto 16px auto;

  border-radius: 10px;
  overflow: hidden;
`;

export const LastContributeCardTwoSkt = styled.View`
  width: 100%;
  height: 102px;
  background-color: ${({ theme }) => theme.colors.tertiary};

  margin: 16px auto 0 auto;
  overflow: hidden;
`;

export const LastContributeCardFooterContentSkt = styled.View`
  width: 92%;
  height: 81px;
  background-color: ${({ theme }) => theme.colors.secondary};

  margin: 10px auto 10px auto;

  border-radius: 16px;
  overflow: hidden;
`;
