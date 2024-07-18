import api from "../../../api";

interface IPostContactDataProps {
  contactData: {
    landline: string;
    phone: string;
    email: string;
  };
  codPes: string;
}

export default async function postContactData({
  contactData,
  codPes,
}: IPostContactDataProps) {
  const data = {
    dddCelular: contactData.phone.slice(0, 2),
    telCelular: contactData.phone.slice(2, 11),
    dddFixo: contactData.landline.slice(0, 2),
    telFixo: contactData.landline.slice(2, 11),
    email: contactData.email,
  };

  try {
    await api.post(`/Participantes/${codPes}/atualizar-dados-contato`, data);
  } catch (err: any) {
    console.log(err);

    throw new Error(err.message);
  }
}
