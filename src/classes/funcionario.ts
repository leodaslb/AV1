import {NivelPermissao} from '../enums/nivelPermissao'

export default class Funcionario {
    public readonly id : string
    public nome : string
    public telefone : string
    public endereco : string
    public usuario : string 
    private senha : string 
    public nivelPermissao : NivelPermissao

    constructor (id : string,nome : string, telefone : string, endereco : string,
        usuario : string, senha : string, nivelPermissao : NivelPermissao){
            this.id = id
            this.nome = nome
            this.telefone = telefone
            this. endereco = endereco
            this.usuario = usuario
            this.senha = senha
            this.nivelPermissao = nivelPermissao
        }

    autenticar(usuario: string, senha: string): boolean {
      if (this.usuario === usuario && this.senha === senha){
        console.log('Login efetuado...')
        return true
      }
      else{
        console.log('Usuario ou senhas invalido')
        return false
      }
  }

    salvar(): void {
    console.log(`Salvando funcionário ${this.nome}...`);
  }

    carregar(): void {
    console.log(`Carregando funcionário ${this.nome}...`);
  }
}