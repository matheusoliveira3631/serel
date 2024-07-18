import api from "../../api";
import { TDocumentsData } from "./resources/resources";

interface IDocumentProps {
  codPes: string;
  codPlano: string;
  numInscr: string;
}

/**
 * Rotas Utilizadas:
 * - /api/Documentos
 */
export default async function documents({
  codPes,
  codPlano,
  numInscr,
}: IDocumentProps) {
  const { data } = await api.get<TDocumentsData[]>("/Documentos", {
    params: {
      codPes,
      codPlano,
      numInscr,
    },
  });

  if (!data) {
    throw new Error("Não foi possível carregar os documentos");
  }

  return data;
}
