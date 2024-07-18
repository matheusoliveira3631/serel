import React, { useState, useCallback, forwardRef } from "react";
import { TextInputMask } from "react-native-masked-text";

import { useTheme } from "../../../../hooks/theme";
import Input from "../index";

function InputMask({ type, editable = true, ...rest }: any, inputRef: any) {
  const [text, setText] = useState("");
  const [rawText, setRawText] = useState("");
  const { theme } = useTheme();

  const handleChangeText = useCallback(
    (maskedText: string, unmaskedText: string) => {
      setText(maskedText);
      setRawText(unmaskedText);
    },
    [],
  );

  return (
    <TextInputMask
      editable={editable}
      type={type}
      includeRawValueInChangeText
      value={text}
      onChangeText={handleChangeText}
      customTextInput={Input}
      customTextInputProps={{
        ref: inputRef,
        rawText,
        onInitialData: setText,
        maskType: true,
      }}
      style={
        !editable
          ? {
              opacity: 0.6,
              color: theme.colors.textPrimary,
            }
          : {
              color: theme.colors.textPrimary,
            }
      }
      {...rest}
    />
  );
}

export default forwardRef(InputMask);
