import { Buffer } from "buffer";
import decode from "jwt-decode";

import api from "../api";

interface IAuthProps {
  cpf: string;
  password: string;
}

/**
 * Rotas Utilizadas:
 * - Auth/token
 *
 * Informações necessárias:
 * - Usuário
 * - Token
 */

export default async function authenticate({ cpf, password }: IAuthProps) {
  const userBuffer = Buffer.from(`${cpf}:${password}`).toString("base64");

  const { data } = await api.post(
    "/Auth/token",
    {},
    {
      headers: {
        Authorization: `Basic ${userBuffer}`,
      },
    },
  );

  const token = data.access_token;
  const { codPes } = decode(token) as any;

  return { token, codPes };
}
