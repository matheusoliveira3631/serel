export default function hideCPF(cpf: string) {
  cpf = `***${
    "." + cpf[3] + cpf[4] + cpf[5] + "." + cpf[6] + cpf[7] + cpf[8] + "-"
  }**`;

  return cpf;
}
