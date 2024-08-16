import { ICategoria } from "./ICategoria";
import { IClassificacao } from "./IClassificacao";
import { IStatusFilme } from "./IStatusFilme";
import { ITrailer } from "./ITrailer";

export interface IFilme {
    id: string,
    nome: string,
    categoria: ICategoria,
    duracao: number,
    classificacao: IClassificacao,
    descricao: string,
    dataEstreia: Date,
    disponibilidade: boolean,
    posterUrl: string,
    direcao: string,
    distribuidora: string,
    statusFilme: IStatusFilme,
    capas: string[],
    trailers: ITrailer[],
}