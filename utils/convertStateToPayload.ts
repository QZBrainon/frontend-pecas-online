import { FormData } from "@/interfaces/FormData";

export function convertStateToPayload(state: FormData) {
  return {
    empresa: state.empresa,
    linkFornecedorOriginal: "",
    razaoSocial: state.razaoSocial,
    cnpj: state.cnpj,
    inscricao: "",
    idDescricao: 0,
    idMarca: 0,
    idPlano: +state.idPlano,
    assinatura: {
      diaPagamento: 15,
      idPlano: +state.idPlano,
      bigBannerUrl: "",
      smallBannerUrl: "",
    },
    contato: {
      vendedores: state.vendedores,
      email: state.email,
      fonePecas: state.telefone,
      whatsappGeral: state.whatsapp,
      whatsappPecas: state.whatsapp,
      website: state.website || "",
    },
    endereco: {
      endereco: state.endereco,
      cidade: state.cidade,
      cep: state.cep,
      pais: "Brasil",
      idEstado: +state.estado,
    },
  };
}
