import api from "../api";

interface IForgotPasswordProps {
  cpf: string;
}

/**
 * Rotas Utilizadas:
 * - Auth/esqueci-senha
 *
 * Informações necessárias:
 * - Recuperar senha para o e-mail do usuário
 */

export default async function forgotPassword({ cpf }: IForgotPasswordProps) {
  console.log(cpf);

  await api.post(`/auth/esqueci-senha`, {
    cpf,
  });
}
