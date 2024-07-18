import getContribution from "./resources/getContribution";
import getContributionEvolution from "./resources/getContributionEvolution";
import getLastContribution from "./resources/getLastContribution";
import { TContributionEvolution } from "./resources/resources";

interface IDashboardProps {
  codPes: string;
  codPlano: string;
  numInscr: string;
  exercicio?: number;
  situacao: string;
}

export type ContributionBalancePerAccount = {
  conta: string;
  saldoReais: number;
  perfil: string;
  qtdCotas: number;
  data: string;
};

/**
 * Rotas Utilizadas:
 * - Contribuicoes/${codPes}/planos/{codPlano}/inscricoes/{numInscr}/ultimas-contribuicoes
 * - Participantes/${codPes}/planos/{codPlano}/evolucao-contribuicao
 * - InformeRendimentos/${codPes}/planos/{codPlano}/inscricoes/{numInscr}/{exercicio}/informe-contrib
 *
 * Informações necessárias:
 * - Lista de inscrições
 * - Dados de última contribuição
 * - Gráfico de "Evolução de arrecadação"
 * - Informações gerais sobre a inscrição (Slides de cards)
 */
export default async function dashboard({
  codPes,
  codPlano,
  numInscr,
  exercicio,
  situacao,
}: IDashboardProps) {
  const contributionEvolution = await getContributionEvolution({
    codPes,
    codPlano,
    numInscr,
    situacao,
  });

  const contributionEvolutionWithPercentage = addPercentage(
    contributionEvolution,
  );

  const contribution = await getContribution({ codPes, codPlano, numInscr });

  const lastContribution = await getLastContribution({
    codPes,
    codPlano,
    numInscr,
  });

  return {
    contribution,
    contributionEvolution: contributionEvolutionWithPercentage,
    lastContribution,
  };
}

function addPercentage(array: TContributionEvolution[]) {
  const encontrarValorMaximo = (array: TContributionEvolution[]): number => {
    if (array.length === 0) {
      return 0;
    }

    return array.reduce((max, obj) => {
      return obj.valor > max ? obj.valor : max;
    }, array[0].valor);
  };

  const higherValue = encontrarValorMaximo(array);

  return array.map(item => {
    return {
      ...item,
      percentage: (item.valor * 100) / higherValue,
    };
  });
}
