import styled from "styled-components/native";

export const Container = styled.View`
  margin: 16px 0;

  display: flex;
  flex-direction: row;
  gap: 12px;
`;

export const IconView = styled.View`
  background-color: white;
  width: 48px;

  display: flex;
  align-items: center;
  padding: 12px;
  border-radius: 12px;
`;

export const PDFImage = styled.Image`
  width: 18px;
  height: 24px;
`;

export const TextView = styled.View`
  width: 62%;
`;

export const Title = styled.Text`
  color: ${({ theme }) => theme.colors.textPrimary};
  font-size: 12px;
  font-weight: bold;
`;

export const Description = styled.Text`
  color: ${({ theme }) => theme.colors.textPrimary};
  font-size: 12px;
`;

export const IconDownloadView = styled.TouchableOpacity`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4px;

  background-color: ${({ theme }) => theme.colors.secondary};

  padding: 0 12px;

  border-top-right-radius: 8px;
  border-bottom-right-radius: 8px;
`;

export const SizeFile = styled.Text`
  color: white;
  font-size: 10px;
  font-weight: bold;
`;
