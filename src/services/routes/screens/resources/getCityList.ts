import api from "../../../api";

export type TCity = {
  idCidade: string;
  nome: string;
  idEstado: string;
  idPais: string;
};

interface GetCityListProps {
  idUf: string;
}

export default async function getCityList({ idUf }: GetCityListProps) {
  const { data } = await api.get<TCity[]>("/participantes/listar-cidade", {
    params: {
      idUf: idUf,
    },
  });

  return data;
}
