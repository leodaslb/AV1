import { StatusPeca } from "../enums/statusPeca"
import { TipoPeca } from "../enums/tipoPeca"


export default class Peca {
    public nome : string 
    public tipo : TipoPeca
    public fornecedor : string
    public status : StatusPeca

    constructor(nome : string, tipo : TipoPeca, fornecedor : string, status : StatusPeca){
        this.nome = nome 
        this.tipo = tipo
        this.fornecedor = fornecedor
        this.status = status
    }

    atualizarStatus(novoStatus: StatusPeca) : void{
        const antigo = this.status
        this.status = novoStatus
        console.log(`Status da peça ${this.nome} atualizado de ${antigo} para ${this.status}`)
}
    salvar() : void {
        console.log(`salvando peça: ..${this.nome}`)
    }
    
    carregar() : void{
        console.log(`carregando peça: ... ${this.nome}`)    
    }
}