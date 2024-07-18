export type TContribution = {
  tipoParticipante: string;
  valorCota: number;
  sldParticipante: number;
  qtdCotasParticipante: number;
  sldPatrocinadora: number;
  qtdCotasPatrocinadora: number;
  qtdCotasTotal: number;
  sldTotal: number;
  dtCota: string;
  saldosPorConta: Array<ContributionBalancePerAccount>;
};

export type TContributionEvolution = {
  ano: number;
  valor: number;
  valorCorrigido: number;
  percentage?: number;
};

export type TLastContribution = {
  dtRef: string;
  vlContribPatrocinadora: number;
  vlContribParticipante: number;
  vlContribTotal: number;
};

export type TRegistrationData = {
  codPes: string;
  nome: string;
  sexo: string;
  cpf: string;
  dtNasc: string;
  ppe: string;
  endereco: {
    codPes: string;
    idEndereco: number;
    logradouro: string;
    numero: string;
    complemento: string;
    bairro: string;
    cidade: string;
    uf: string;
    idCidade: string;
    idEstado: string;
    cep: string;
    pais: string;
    idTipoEndereco: number;
  };
  telFixo: string;
  telCelular: string;
  email: string;
  estCivil: string;
  nacionalidade: string;
  estNatal: string;
  naturalidade: string;
  numDocumento: string;
  natDocumento: string;
  orgaoEmissor: string;
  dtEmissao: string;
  ocupacao: string;
  codigo: string;
  empresa: string;
  instVinc: string;
  origem: string;
  categoria: string;
  representante: string;
  renBrutaMens: string;
  resideExt: string;
  obrigExt: string;
  idadeEntrada: string;
  valContrib: string;
  tributacao: string;
  beneficiarios: [
    {
      codPes: string;
      codDep: string;
      nome: string;
      percBen: string;
      cpf: string;
      dtNasc: string;
      dtObito: string;
      descrGrauDep: string;
      grauDep: string;
    },
  ];
};

type SubscriptionExtractBalancePerAccount = {
  conta: string;
  saldoReais: number;
  perfil: string;
  qtdCotas: number;
  data: string;
};

type SubscriptionExtractItem = {
  dtRef: string;
  dtApropriacao: string;
  codPerfil: string;
  tipoOperacao: string;
  historico: string;
  conta: string;
  qtdCotas: number;
  vlNominal: number;
};

type SubscriptionExtractMovement = {
  mesAnoCompetencia: string;
  dtVencimento: string;
  dtPagamento: string;
  contribuicao: string;
  operacao: string;
  qtCota: number;
  vlCota: number;
  valor: number;
  valorAtualizado: number;
};

type SubscriptionExtractSummary = {
  tipo: string;
  valorPago: number;
  qtdTotalCotas: number;
  valorAtualizado: number;
};

export type TSubscriptionExtract = {
  saldo: {
    tipoParticipante: string;
    valorCota: number;
    sldParticipante: number;
    qtdCotasParticipante: number;
    sldPatrocinadora: number;
    qtdCotasPatrocinadora: number;
    qtdCotasTotal: number;
    sldTotal: number;
    dtCota: string;
    saldosPorConta: Array<SubscriptionExtractBalancePerAccount>;
  };
  itens: Array<SubscriptionExtractItem>;
  dtIni: string;
  dtFin: string;
  nome: string;
  cpf: string;
  mesAnoInicial: string;
  inscricao: string;
  mesAnoCota: string;
  dtCota: string;
  dtEmissao: string;
  dtAdesao: string;
  nomePlano: string;
  tipoTrib: string;
  vlCota: number;
  mesAnoFinal: string;
  valorTotal: number;
  movimento: Array<SubscriptionExtractMovement>;
  resumo: Array<SubscriptionExtractSummary>;
  resumoMovimento: null;
  resumoTotal: Array<SubscriptionExtractSummary>;
  cnpjEntidade: string;
  siglaEntidade: string;
  razaoSocialEntidade: string;
  enderecoEntidade: string;
  bairroEntidade: string;
  cepEntidade: string;
  identidadeRelatorio: null;
  tokenSeguranca: null;
  imgLogo: string;
  usuario: null;
};

export type TDocumentsData = {
  categoria: string;
  documentos: Array<TDocuments>;
};

type TDocuments = {
  idDocumento: number;
  nomeDocumento: string;
  mimeType: string;
  dtDocumento: string;
  base64: string;
  tamanho: number;
};
