import { ICategoria } from "./ICategoria";
import { IClassificacao } from "./IClassificacao";
import { IStatusFilme } from "./IStatusFilme";

export interface IFilme {
    id: string,
    nome: string,
    categoria: ICategoria,
    duracao: number,
    classificacao: IClassificacao | string,
    descricao: string,
    dataEstreia: Date | string,
    disponibilidade: boolean,
    banner: string,
    direcao: string,
    distribuidora: string,
    statusFilme: IStatusFilme | string,
    capas: string[],
    trailers: string[],
}