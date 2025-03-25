export interface FormData {
  empresa: string;
  razaoSocial: string;
  cnpj: string;
  idPlano: string;
  endereco: string;
  cidade: string;
  estado: string;
  cep: string;
  bairro: string;
  telefone: string;
  whatsapp: string;
  email: string;
  website?: string;
  vendedores: string;
}

export const INITIAL_STATE = {
  empresa: "",
  razaoSocial: "",
  idDescricao: "",
  idMarca: "",
  cnpj: "",
  inscricaoEstadual: "",
  idPlano: "",
  bannerPequeno: "",
  bannerGrande: "",
  endereco: "",
  cidade: "",
  estado: "",
  cep: "",
  bairro: "",
  telefone: "",
  whatsapp: "",
  email: "",
  website: "",
  vendedores: "",
};
