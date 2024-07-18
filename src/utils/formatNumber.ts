interface IFormatNumberDTO {
  type:
    | "cpf"
    | "cnpj"
    | "currency"
    | "currencyWithoutRS"
    | "cep"
    | "compactNumber";
  data: string | number;
}

export default function formatNumber({ data, type }: IFormatNumberDTO): string {
  if (type === "cpf") {
    return String(data).replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
  }

  if (type === "cnpj") {
    return String(data).replace(
      /(\d{0,2})(\d{0,3})(\d{0,3})(\d{0,4})(\d{0,2})/,

      "$1.$2.$3/$4-$5",
    );
  }

  if (type === "currency") {
    return Intl.NumberFormat("pt-br", {
      currency: "brl",
      // minimumFractionDigits: 0,
      maximumFractionDigits: 2,

      style: "currency",
    }).format(Number(data));
  }

  if (type === "currencyWithoutRS") {
    return Intl.NumberFormat("pt-br", {
      currency: "brl",
      maximumFractionDigits: 20,

      style: "currency",
    })
      .format(Number(data))
      .replace("R$", "")
      .trimStart();
  }

  if (type === "cep") {
    return String(data).replace(/^(\d{5})(\d{3})$/, "$1-$2");
  }

  if (type === "compactNumber") {
    let formatter;
    if (Number(data) > 1000000) {
      formatter = new Intl.NumberFormat("pt-BR", {
        notation: "compact",
        compactDisplay: "short",
        minimumFractionDigits: 0,
        maximumFractionDigits: 2,
      });
    } else {
      formatter = new Intl.NumberFormat("pt-BR", {
        notation: "compact",
        compactDisplay: "short",
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      });
    }

    return formatter.format(Number(data));
  }

  return "invalid";
}
