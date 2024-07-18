import api from "../../../api";
import { TLastContribution } from "./resources";

interface IGetContributionProps {
  codPes: string;
  codPlano: string;
  numInscr: string;
}

export default async function getLastContribution({
  codPes,
  codPlano,
  numInscr,
}: IGetContributionProps) {
  const { data } = await api.get<TLastContribution>(
    `/contribuicoes/${codPes}/planos/${codPlano}/inscricoes/${encodeURIComponent(
      numInscr,
    )}/ultimas-contribuicoes`,
  );

  return data;
}
