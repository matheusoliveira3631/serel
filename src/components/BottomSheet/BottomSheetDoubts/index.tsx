import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import { FlatList, PixelRatio } from "react-native";

import { Feather } from "@expo/vector-icons";
import BottomSheet from "@gorhom/bottom-sheet";

import { useTheme } from "../../../hooks/theme";
import getTips from "../../../services/routes/screens/resources/getTips";
import Button from "../../form/Button";
import { Container, ListItem, ListItemTitle, Title } from "./styles";

import BottomSheetComponent from "..";

type TDoubt = {
  title: string;
  id: string;
};

interface IBottomSheetDoubtsProps {
  isVisible: boolean;
  setIsVisible: Dispatch<SetStateAction<boolean>>;
}

export default function BottomSheetDoubts({
  isVisible,
  setIsVisible,
}: IBottomSheetDoubtsProps) {
  const { theme } = useTheme();
  const bottomSheetRef = useRef<BottomSheet>(null);
  const [doubtsList, setDoubtsList] = useState<TDoubt[]>();

  const tamanhoFonte = 16 * PixelRatio.getFontScale();

  const getInformation = async () => {
    const data = await getTips();
    setDoubtsList(data);
  };

  useEffect(() => {
    getInformation();
  }, []);

  return (
    <BottomSheetComponent
      bottomSheetRef={bottomSheetRef}
      isVisible={isVisible}
      setIsVisible={setIsVisible}
      snapPoints={tamanhoFonte > 18 ? "80%" : "60%"}
    >
      <Container>
        <Feather
          name="help-circle"
          color={theme.colors.backgroundButton}
          size={64}
        />
        <Title>Dicas e dúvidas frequentes</Title>

        <FlatList
          style={{ width: "100%" }}
          data={doubtsList}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <ListItem>
              <ListItemTitle>{`\u2022 ${item.title}`}</ListItemTitle>
            </ListItem>
          )}
          contentContainerStyle={{
            paddingBottom: tamanhoFonte > 18 ? 160 : 120,
            paddingRight: 8,
          }}
          ListFooterComponentStyle={{
            width: "100%",
          }}
          ListFooterComponent={
            <Button
              onPress={() => {
                setIsVisible(false);
                bottomSheetRef.current?.close();
              }}
            >
              ENTENDI
            </Button>
          }
        />
      </Container>
    </BottomSheetComponent>
  );
}
