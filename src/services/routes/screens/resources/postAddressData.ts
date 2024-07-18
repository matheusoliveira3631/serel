import api from "../../../api";
import { TContribution } from "./resources";

interface IPostAddressDataProps {
  addressData: {
    idtipoendereco: number;
    logradouro: string;
    bairro: string;
    idcidade: number;
    idestado: number;
    cep: string;
    idpais: number;
  };
  codPes: string;
}

export default async function postAddressData({
  addressData,
  codPes,
}: IPostAddressDataProps) {
  const data = {
    codpes: codPes,
    idtipoendereco: addressData.idtipoendereco,
    logradouro: addressData.logradouro,
    bairro: addressData.bairro,
    idcidade: addressData.idcidade,
    idestado: addressData.idestado,
    cep: addressData.cep,
    idpais: addressData.idpais,
  };

  try {
    await api.post<TContribution>(
      `/Participantes/{codPes}/atualizar-dados-endereco`,
      data,
    );
  } catch {
    throw new Error();
  }
}
