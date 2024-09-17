import { ITipoUsuario } from "./ITipoUsuario"

export interface IUsuarioClient{
  id: string,
  nome: string,
  email: string,
  senha: string,
  confirmPassword: string,
  status: boolean,
  tipoUsuario: ITipoUsuario | string,
  cidade: string,
  estado: string
}
