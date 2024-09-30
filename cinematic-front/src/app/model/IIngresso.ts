import { IAssento } from "./IAssento";
import { ISessao } from "./ISessao";
import { ITipoIngresso } from "./ITipoIngresso";
import { IUsuario } from "./IUsuario";

export interface IIngresso {
  id: string,
  sessao: ISessao,
  assento: IAssento,
  tipo: ITipoIngresso,
  valor: number
}
