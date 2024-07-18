import api from "../../../api";
import { TContributionEvolution } from "./resources";

interface IGetContributionEvolutionProps {
  codPes: string;
  codPlano: string;
  numInscr: string;
  situacao: string;
}

export default async function getContributionEvolution({
  codPes,
  codPlano,
  numInscr,
  situacao,
}: IGetContributionEvolutionProps) {
  let dataReturn: any;

  if (situacao.toUpperCase().includes("ATIVO")) {
    const { data } = await api.get<TContributionEvolution[]>(
      `/participantes/${codPes}/planos/${codPlano}/evolucao-contribuicao?numInscr=${numInscr}`,
    );
    dataReturn = data;
  } else {
    const { data } = await api.get<TContributionEvolution[]>(
      `/participantes/${codPes}/planos/${codPlano}/evolucao-contribuicao-assistido?numInscr=${numInscr}`,
    );
    dataReturn = data;
  }

  return dataReturn;
}
