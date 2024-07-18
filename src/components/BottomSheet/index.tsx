import React, { Dispatch, SetStateAction, ReactNode, RefObject } from "react";
import {} from "react-native-gesture-handler";

import { Feather } from "@expo/vector-icons";
import BottomSheet from "@gorhom/bottom-sheet";
import { BottomSheetMethods } from "@gorhom/bottom-sheet/lib/typescript/types";

import { useTheme } from "../../hooks/theme";

interface IBottomSheetProps {
  isVisible: boolean;
  setIsVisible: Dispatch<SetStateAction<boolean>>;
  children: ReactNode;
  snapPoints?: string;
  bottomSheetRef: RefObject<BottomSheetMethods>;
}

export default function BottomSheetComponent({
  isVisible,
  setIsVisible,
  children,
  snapPoints = "60%",
  bottomSheetRef,
}: IBottomSheetProps) {
  const { theme } = useTheme();

  return (
    <BottomSheet
      ref={bottomSheetRef}
      index={isVisible ? 0 : -1}
      snapPoints={[snapPoints]}
      backgroundStyle={{
        backgroundColor: theme.colors.background,
      }}
      style={{
        borderWidth: 2,
        borderColor: theme.colors.inputBorder,
        borderTopRightRadius: 24,
        borderTopLeftRadius: 24,
        overflow: "hidden",
      }}
      handleIndicatorStyle={{ display: "none" }}
    >
      {children}

      <Feather
        name="x"
        color={theme.colors.textPrimary}
        size={32}
        style={{ position: "absolute", right: 16 }}
        onPress={() => {
          setIsVisible(false);
          bottomSheetRef.current?.close();
        }}
      />
    </BottomSheet>
  );
}
