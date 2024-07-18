import getContribution from "./resources/getContribution";
import getSubscriptionExtractActive from "./resources/getSubscriptionExtractActive";
import getSubscriptionExtractNoActive from "./resources/getSubscriptionExtractNoActive";
import { TSubscriptionExtract } from "./resources/resources";

interface IExtractProps {
  codPes: string;
  codPlano: string;
  numInscr: string;
  exercicio: number;
  mesAnoIni: Date;
  mesAnoFin: Date;
  isActiveStatus: boolean;
}

export type CarouselValuesCardType = {
  label: string;
  value: number;
};

/**
 * Rotas Utilizadas:
 * - InformeRendimentos/${codPes}/planos/{codPlano}/inscricoes/{numInscr}/{exercicio}/informe-contrib
 *
 * Informações necessárias:
 * - Carregar o saldo e extrato de uma determinada inscrição
 */
export default async function extract({
  codPes,
  codPlano,
  numInscr,
  exercicio,
  mesAnoIni,
  mesAnoFin,
  isActiveStatus,
}: IExtractProps) {
  let subscriptionExtract: TSubscriptionExtract;

  if (isActiveStatus) {
    subscriptionExtract = await getSubscriptionExtractNoActive({
      codPes,
      codPlano,
      numInscr,
      mesAnoIni,
      mesAnoFin,
    });
  } else {
    subscriptionExtract = await getSubscriptionExtractActive({
      codPes,
      codPlano,
      numInscr,
      mesAnoIni,
      mesAnoFin,
    });
  }

  const contribution = await getContribution({ codPes, codPlano, numInscr });

  return {
    subscriptionExtract,
    contribution,
  };
}
