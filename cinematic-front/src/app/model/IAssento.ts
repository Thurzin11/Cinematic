import { EStatusAssento } from "./EStatusAssento";

export interface IAssento {
    id: string,
    nome: string,
    tipo: string,
    status: EStatusAssento 
}