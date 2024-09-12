import { Dispatch, SetStateAction, useRef } from "react";
import { View, Dimensions } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { SafeAreaViewProps } from "react-native-safe-area-context";

import BottomSheet from "@gorhom/bottom-sheet";

import { TSubscription, useSubscription } from "../../../hooks/subscriptions";
import {
  Container,
  Description,
  ItemContainer,
  ItemContent,
  ItemTitle,
  LabelItemEnrollment,
  LabelItemSituation,
  Title,
  TitleItemEnrollment,
  TitleItemSituation,
  ViewLineItem,
} from "./styles";

import BottomSheetComponent from "..";

const { width } = Dimensions.get("window");

interface IBottomSheetSubscriptionProps {
  isVisible: boolean;
  setIsVisible: Dispatch<SetStateAction<boolean>>;
  handleChangeSubscription(subscriptionSelected: TSubscription): void;
}

export default function BottomSheetSubscription({
  isVisible,
  setIsVisible,
  handleChangeSubscription,
}: IBottomSheetSubscriptionProps) {
  const bottomSheetRef = useRef<BottomSheet>(null);
  const { allSubscriptions } = useSubscription();

  return (
    <BottomSheetComponent
      bottomSheetRef={bottomSheetRef}
      isVisible={isVisible}
      setIsVisible={setIsVisible}
      snapPoints="59%"
    >
      <Container
        style={{
          paddingBottom: 100,
        }}
      >
        <Title>Trocar inscrição</Title>
        <Description>
          Selecione a inscrição para alterar os dados do app.
        </Description>

        <FlatList
          data={allSubscriptions}
          showsVerticalScrollIndicator={false}
          keyExtractor={item => item.numInscr}
          renderItem={({ item }) => (
            <ItemEnrollment
              data={item}
              onPress={() => {
                handleChangeSubscription(item);
                bottomSheetRef.current?.close();
              }}
            />
          )}
          contentContainerStyle={{
            gap: 16,
            alignItems: "center",
            paddingBottom: 48,
          }}
        />
      </Container>
    </BottomSheetComponent>
  );
}

interface IItemEnrollmentProps extends SafeAreaViewProps {
  data: TSubscription;
  onPress: () => void;
}

function ItemEnrollment({ data, onPress }: IItemEnrollmentProps) {
  return (
    <ItemContainer style={{ width: width - 64 }} onPress={onPress}>
      <ItemTitle>Plano: {data.plano}</ItemTitle>

      <ItemContent>
        <ViewLineItem>
          <LabelItemEnrollment>Inscrição:</LabelItemEnrollment>
          <TitleItemEnrollment>{data.numInscr}</TitleItemEnrollment>
        </ViewLineItem>

        <View style={{ gap: 8 }}>
          <ViewLineItem>
            <LabelItemSituation>Situação: </LabelItemSituation>
            <TitleItemSituation>{data.situacao}</TitleItemSituation>
          </ViewLineItem>

          <ViewLineItem>
            <LabelItemSituation>Patrocinadora: </LabelItemSituation>
            <TitleItemSituation>{data.patrocinadora}</TitleItemSituation>
          </ViewLineItem>
        </View>
      </ItemContent>
    </ItemContainer>
  );
}
