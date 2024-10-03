import { IAssento } from "./IAssento";
import { ISessao } from "./ISessao";

export interface IIngressoRegister {
    sessao: ISessao,
    assento: IAssento,
    tipo: string,
    valor: number
}