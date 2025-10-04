import { TipoAeronave } from "../enums/tipoAeronave"
import Etapa from "./etapa"
import Peca from "./peca"
import Teste from "./teste"

export default class Aeronave {
    public readonly codigo : string
    public modelo : string 
    public tipo : TipoAeronave
    public capacidade : number
    public alcance : number

    public pecas: Peca[]
    public etapas: Etapa[]
    public testes: Teste[]

    constructor( codigo : string, modelo : string, tipo : TipoAeronave,
        capacidade : number, alcance : number) {
            this.codigo = codigo
            this.modelo = modelo
            this.tipo = tipo
            this.capacidade = capacidade
            this.alcance = alcance
            this.pecas = []
            this.etapas = []
            this.testes = []
        }

    adicionarPeca(peca:Peca): void {
        this.pecas.push(peca)
        console.log(`Aeronave ${this.codigo} - Peça ${peca.nome} adicionada `)

    }
    adicionarEtapa(etapa:Etapa): void{
        this.etapas.push(etapa)
        console.log(`Aeronave ${this.codigo} - Etapa ${etapa.nome} adicionada ao plano de Produção`)

    }
    adicionarTeste(teste:Teste): void{
        this.testes.push(teste)
        console.log(`Aeronave ${this.codigo} - Teste ${teste.tipo} adicionada ao plano de teste`)
    }

    detalhes(): void {
        console.log(`--- Detalhes da Aeronave ---`)
        console.log(`Código: ${this.codigo}`)
        console.log(`Modelo: ${this.modelo}`)
        console.log(`Tipo: ${this.tipo}`)
        console.log(`Capacidade: ${this.capacidade}`)
        console.log(`Alcance: ${this.alcance} km`)

        console.log(`\n --- Peças associadas (${this.pecas.length}) ---`)
        if (this.pecas.length == 0) {
            console.log("Sem peças associadas")            
        }
        else {
            this.pecas.forEach(p => { console.log(`${p.nome} Fornecedor: ${p.fornecedor} Status:${p.status}`)     
            });     
        }

        console.log(`\n --- Etapas associadas (${this.etapas.length})`)
        if (this.etapas.length== 0){
            console.log(" Sem etapas associadas")
        }
        else{
            this.etapas.forEach(e => { console.log(`${e.nome} Prazo: ${e.prazo} Status: ${e.status}`)                
            });
        }

        console.log(`\n --- Testes associadas (${this.testes.length})`)
        if (this.testes.length == 0){
            console.log(" sem testes associados")
        }
        else{
            this.testes.forEach(t => {console.log(`${t.tipo} Resultado: ${t.resultado || 'Pendente'}`)
            })
        }
        console.log('=======================================/n')

        
    }
    
    salvar() : void {
        console.log(`salvando aeronave: ..${this.codigo}`)
    }
    
    carregar() : void{
        console.log(`carregando aeronova: ... ${this.codigo}`)    
    }
    } 