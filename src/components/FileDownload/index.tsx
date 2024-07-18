import { useCallback } from "react";
import { Platform } from "react-native";

import { Feather } from "@expo/vector-icons";
import * as FileSystem from "expo-file-system";
import * as IntentLauncher from "expo-intent-launcher";
import * as Sharing from "expo-sharing";

import pdfImagePNG from "../../../assets/pdf.png";
import { useTheme } from "../../hooks/theme";
import api from "../../services/api";
import Toast from "../Toast";
import {
  Container,
  IconDownloadView,
  IconView,
  PDFImage,
  SizeFile,
  TextView,
  Title,
} from "./styles";

interface IFileDownloadProps {
  data: {
    idDocumento: number;
    nomeDocumento: string;
    size: string;
  };
}

export default function FileDownload({ data }: IFileDownloadProps) {
  const { nomeDocumento, size } = data;
  const { theme } = useTheme();

  const save = useCallback(async (uri, type) => {
    if (Platform.OS === "android") {
      const contentURL = await FileSystem.getContentUriAsync(uri);
      await IntentLauncher.startActivityAsync("android.intent.action.VIEW", {
        data: contentURL,
        flags: 1,
        type,
      });
    } else {
      await Sharing.shareAsync(uri);
    }
  }, []);

  const handleDownloadFile = useCallback(async () => {
    try {
      const localPath = `${
        FileSystem.documentDirectory
      }${data.nomeDocumento.replaceAll(" ", "_")}`;

      const fileDownloaded = await FileSystem.downloadAsync(
        api.getUri({ url: `/Documentos/${data.idDocumento}` }),
        localPath,
        {
          headers: {
            authorization: String(api.defaults.headers.common.authorization),
          },
        },
      );

      if (fileDownloaded.status !== 200) {
        Toast({
          message: "Erro ao baixar arquivo",
          description: "Por favor tente mais tarde",
          type: "danger",
          duration: 5000,
          icon: "danger",
        });
        return;
      }

      save(fileDownloaded.uri, fileDownloaded.headers["content-type"]);
    } catch (error) {
      Toast({
        message: "Erro ao baixar arquivo",
        description: "Arquivo não encontrado",
        type: "danger",
        duration: 5000,
        icon: "danger",
      });
    }
  }, [data.idDocumento, data.nomeDocumento, save]);

  return (
    <Container>
      <IconView>
        <PDFImage source={pdfImagePNG} />
      </IconView>

      <TextView>
        <Title>{nomeDocumento}</Title>
        {/* <Description>{description}</Description> */}
      </TextView>

      <IconDownloadView onPress={handleDownloadFile}>
        <Feather name="download" size={16} color={theme.colors.textSecondary} />

        <SizeFile>{size}</SizeFile>
      </IconDownloadView>
    </Container>
  );
}
