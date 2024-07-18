import getRegistrationData from "./resources/getRegistrationData";
import getUFList from "./resources/getUFList";

interface IRegisterDataProps {
  codPes: string;
  numInscr: string;
}

/**
 * Rotas Utilizadas:
 * - Participantes/{codPes}/dados-cadastrais/{numInscr}
 *
 * Informações necessárias:
 * - Retornar os dados cadastrais do usuário Logado
 */
export default async function registerData({
  codPes,
  numInscr,
}: IRegisterDataProps) {
  const registrationData = await getRegistrationData({ codPes, numInscr });

  const ufListData = await getUFList();

  return { registrationData, ufListData };
}
