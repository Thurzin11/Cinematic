import { ETamanhoSala } from "./ETamanhoSala";
import { ETipoSala } from "./ETipoSala";

export interface ISala {
    id: string,
    numero: number,
    fileiras: string[],
    quantidadeColunas: number,
    tipo: ETipoSala | string,
    tamanho: ETamanhoSala | string,
    disponibilidade: boolean
}