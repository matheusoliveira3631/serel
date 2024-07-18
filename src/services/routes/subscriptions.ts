import { TSubscription } from "../../hooks/subscriptions";
import api from "../api";

interface ISubscriptionProps {
  codPes: string;
}

/**
 * Rotas Utilizadas:
 * - Participantes/${codPes}/inscricoes
 *
 * Informações necessárias:
 * - Inscrições
 */

export default async function subscriptions({ codPes }: ISubscriptionProps) {
  const { data } = await api.get<TSubscription[]>(
    `/participantes/${codPes}/inscricoes`,
  );

  return data;
}
