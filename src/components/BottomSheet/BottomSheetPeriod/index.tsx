import { Dispatch, SetStateAction, useRef, RefObject } from "react";
import { FlatList } from "react-native";

import BottomSheet from "@gorhom/bottom-sheet";
import { BottomSheetMethods } from "@gorhom/bottom-sheet/lib/typescript/types";

import { useTheme } from "../../../hooks/theme";

import BottomSheetComponent from "..";

import {
  ButtonItem,
  ButtonText,
  Container,
  Description,
  Title,
} from "./styles";

interface IBottomSheetPeriodProps {
  isVisible: boolean;
  setIsVisible: Dispatch<SetStateAction<boolean>>;
  selectedPeriod: "5" | "6" | "7" | "8";
  setSelectedPeriod: Dispatch<SetStateAction<"5" | "6" | "7" | "8">>;
}

type OptionsOfPeriodType = {
  id: string;
  period: "5" | "6" | "7" | "8";
};

const optionsOfPeriod: OptionsOfPeriodType[] = [
  {
    id: "1",
    period: "5",
  },
  {
    id: "2",
    period: "6",
  },
  {
    id: "3",
    period: "7",
  },
  {
    id: "4",
    period: "8",
  },
];

export default function BottomSheetPeriod({
  isVisible,
  setIsVisible,
  selectedPeriod,
  setSelectedPeriod,
}: IBottomSheetPeriodProps) {
  const bottomSheetRef = useRef<BottomSheet>(null);

  return (
    <BottomSheetComponent
      bottomSheetRef={bottomSheetRef}
      isVisible={isVisible}
      setIsVisible={setIsVisible}
      snapPoints="40%"
    >
      <Container>
        <Title>Últimos períodos</Title>

        <FlatList
          data={optionsOfPeriod}
          keyExtractor={item => item.id}
          numColumns={2}
          columnWrapperStyle={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            width: "100%",
          }}
          renderItem={({ item }) => (
            <Item
              title={item.period}
              selectedPeriod={selectedPeriod}
              setSelectedPeriod={setSelectedPeriod}
              setIsVisible={setIsVisible}
              bottomSheetRef={bottomSheetRef}
            />
          )}
          contentContainerStyle={{
            display: "flex",
            flexDirection: "column",
            width: "100%",
            alignItems: "center",
            gap: 8,
            justifyContent: "space-between",
            marginTop: 16,
          }}
        />

        <Description>
          Confira seu extrato com período máximo de 8 anos.
        </Description>
      </Container>
    </BottomSheetComponent>
  );
}
interface IItemProps {
  title: "5" | "6" | "7" | "8";
  selectedPeriod: "5" | "6" | "7" | "8";
  setSelectedPeriod: Dispatch<SetStateAction<"5" | "6" | "7" | "8">>;
  setIsVisible: Dispatch<SetStateAction<boolean>>;
  bottomSheetRef: RefObject<BottomSheetMethods>;
}

function Item({
  title,
  selectedPeriod,
  setSelectedPeriod,
  setIsVisible,
  bottomSheetRef,
}: IItemProps) {
  const { theme } = useTheme();
  return (
    <ButtonItem
      onPress={() => {
        setSelectedPeriod(title);
        setIsVisible(false);
        setTimeout(() => {
          bottomSheetRef.current?.close();
        }, 200);
      }}
      style={
        title === selectedPeriod
          ? { backgroundColor: theme.colors.backgroundButtonSelected }
          : { backgroundColor: theme.colors.backgroundButton }
      }
    >
      <ButtonText>{title} anos</ButtonText>
    </ButtonItem>
  );
}
