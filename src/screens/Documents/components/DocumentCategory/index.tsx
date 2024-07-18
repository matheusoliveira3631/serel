import { useState } from "react";

import { Feather, MaterialIcons } from "@expo/vector-icons";

import FileDownload from "../../../../components/FileDownload";
import { useTheme } from "../../../../hooks/theme";
import { TDocumentsData } from "../../../../services/routes/screens/resources/resources";
import convertBytes from "../../../../utils/convertBytes";
import { Container, CollapseTitleView, CollapseTitle } from "./styles";

interface IDocumentCategoryProps {
  data: TDocumentsData;
}

export default function DocumentCategory({ data }: IDocumentCategoryProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { theme } = useTheme();

  return (
    <Container>
      <CollapseTitleView
        onPress={() => {
          setIsOpen(state => !state);
        }}
      >
        <Feather name="file-text" size={24} color={theme.colors.textPrimary} />
        <CollapseTitle>{data.categoria}</CollapseTitle>
        <MaterialIcons
          name={isOpen ? "keyboard-arrow-up" : "keyboard-arrow-down"}
          size={24}
          color={theme.colors.textPrimary}
          style={{ marginLeft: "auto" }}
        />
      </CollapseTitleView>

      {isOpen &&
        data.documentos.map(document => (
          <FileDownload
            key={document.nomeDocumento}
            data={{
              ...document,
              size: convertBytes(document.tamanho),
            }}
          />
        ))}
    </Container>
  );
}
