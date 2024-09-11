import { ITipoUsuario } from "./ITipoUsuario"

export interface IUsuario{
  id: string,
  nome: string,
  email: string,
  senha: string,
  status: boolean,
  tipoUsuario: ITipoUsuario | string
}
