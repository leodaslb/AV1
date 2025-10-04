import { ResultadoTeste } from "../enums/resultadoTeste";
import { TipoTeste } from "../enums/tipoTeste";

export default class Teste {
    public tipo: TipoTeste
    public resultado?: ResultadoTeste

    constructor(tipo: TipoTeste){
        this.tipo = tipo

    }

    executar(resultado: ResultadoTeste): void{
        this.resultado = resultado
        console.log(`Teste de ${this.tipo} executado. Resultado: ${this.resultado}`)
    }
    salvar() : void {
        console.log(`salvando teste: ..${this.tipo}`)
    }
    
    carregar() : void{
        console.log(`carregando teste: ... ${this.tipo}`)    
    }

}