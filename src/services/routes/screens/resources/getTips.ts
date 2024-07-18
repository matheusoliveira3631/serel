import api from "../../../api";

export default async function getTips() {
  const { data } = await api.get<string[]>("/Dicas");

  const dataWithID = data.map(tip => {
    return {
      title: tip,
      id: String(Math.random() * 1000),
    };
  });

  return dataWithID;
}
