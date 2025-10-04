import { StatusEtapa } from "../enums/statusEtapa"
import Funcionario from "./funcionario"



export default class Etapa {
    public nome : string
    public prazo : string
    public status : StatusEtapa
    public funcionarios : Funcionario[]

    constructor(  nome : string, prazo : string, status:StatusEtapa){
      this.nome = nome
      this.prazo = prazo
      this.status = status
      this.funcionarios = []
    }
    iniciar(): void {
      if (this.status === StatusEtapa.Pendente){
        this.status = StatusEtapa.Andamento
        console.log(`Iniciando etapa ${this.nome}...`);}
      else{
        console.warn('Etapa nao pode ser iniciada pois seu Status é: ', this.status)
      }
  }

    finalizar(): void {
      this.status = StatusEtapa.Concluida
      console.log(`Finalizando etapa ${this.nome}...`);
  } 

  associarFuncionario(funcionario:Funcionario): void {
    this.funcionarios.push(funcionario)
    console.log(`Funcionario ${funcionario.nome} associado à etapa ${this.nome}`)
  }

  listarFuncionarios(): Funcionario[]{
     console.log("Funcionários da etapa:", this.funcionarios.map(f => f.nome))
     return this.funcionarios
  }
  
}
