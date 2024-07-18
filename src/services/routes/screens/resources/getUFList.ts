import api from "../../../api";

export type TUF = {
  idUf: string;
  nome: string;
  sigla: string;
  idPais: string;
};


export default async function getUFList() {
  const { data } = await api.get<TUF[]>("/participantes/listar-uf");

  return data;
}
