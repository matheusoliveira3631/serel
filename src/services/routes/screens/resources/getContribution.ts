import api from "../../../api";
import { TContribution } from "./resources";

interface IGetContributionProps {
  codPes: string;
  codPlano: string;
  numInscr: string;
}

export default async function getContribution({
  codPes,
  codPlano,
  numInscr,
}: IGetContributionProps) {
  const { data } = await api.get<TContribution>(
    `/participantes/${codPes}/planos/${codPlano}/saldo-contribuicao?numInscr=${encodeURIComponent(
      numInscr,
    )}`,
  );

  return data;
}
