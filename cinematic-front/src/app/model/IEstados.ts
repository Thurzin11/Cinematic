export interface IEstados{
  id: number,
  nome: string,
  sigla: string
  regiao: {
    id: number,
    nome: string,
    sigla: string
  }
}
