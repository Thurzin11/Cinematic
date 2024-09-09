import { EIdioma } from "./EIdioma";
import { IAssento } from "./IAssento";
import { IEstabelecimento } from "./IEstabelecimento";
import { IFilme } from "./IFilme";
import { IHorario } from "./IHorario";
import { ISala } from "./ISala";

export interface ISessao {
    id: string,
    sala: ISala,
    horario: IHorario,
    filme: IFilme,
    disponibilidade: boolean,
    assentos: IAssento[],
    idioma: EIdioma | string,
    tipo: string,
    data: Date | string,
    estabelecimento: IEstabelecimento
}