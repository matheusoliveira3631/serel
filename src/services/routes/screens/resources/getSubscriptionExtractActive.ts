import { format } from "date-fns";

import api from "../../../api";
import { TSubscriptionExtract } from "./resources";

interface IGetSubscriptionExtract {
  codPes: string;
  codPlano: string;
  numInscr: string;
  mesAnoIni: Date;
  mesAnoFin: Date;
}

export default async function getSubscriptionExtractActive({
  codPes,
  codPlano,
  numInscr,
  mesAnoIni,
  mesAnoFin,
}: IGetSubscriptionExtract) {
  const mesAnoIniFormatted = format(mesAnoIni, "MM-yyyy");
  const mesAnoFinFormatted = format(mesAnoFin, "MM-yyyy");

  const { data } = await api.get<TSubscriptionExtract>(
    `/participantes/${codPes}/planos/${codPlano}/extrato?mesAnoIni=${mesAnoIniFormatted}&mesAnoFin=${mesAnoFinFormatted}&numInscr=${numInscr}`,
  );

  return data;
}
