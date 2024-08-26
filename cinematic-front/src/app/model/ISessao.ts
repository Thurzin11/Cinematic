import { EIdioma } from "./EIdioma";
import { IAssento } from "./IAssento";
import { IFilme } from "./IFilme";
import { ISala } from "./ISala";

export interface ISessao {
    id: string,
    sala: ISala | string,
    horario: string,
    filme: IFilme | string,
    disponibilidade: boolean,
    assentos: IAssento[],
    idioma: EIdioma | string,
    tipo: string,
    data: Date | string
}