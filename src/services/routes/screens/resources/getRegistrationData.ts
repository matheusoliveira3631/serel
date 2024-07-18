import api from "../../../api";
import { TRegistrationData } from "./resources";

interface IGetRegistrationProps {
  codPes: string;
  numInscr: string;
}

export default async function getRegistrationData({
  codPes,
  numInscr,
}: IGetRegistrationProps) {
  const { data } = await api.get<TRegistrationData>(
    `/participantes/${codPes}/dados-cadastrais/${encodeURIComponent(numInscr)}`,
  );

  return data;
}
