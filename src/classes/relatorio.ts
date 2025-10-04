import * as fs from 'fs';
import Aeronave from "./aeronave";

export default class Relatorio {

    public nomeCliente: string;
    public dataEntrega: Date;

    constructor(nomeCliente: string, dataEntrega: Date) {
        this.nomeCliente = nomeCliente;
        this.dataEntrega = dataEntrega;
    }
    
    public gerarRelatorio(aeronave: Aeronave): string {
        console.log(`Gerando relatório para a aeronave ${aeronave.codigo}...`);
        
        let conteudo = `***********************************************\n`;
        conteudo += `* RELATÓRIO FINAL DE ENTREGA - AEROCODE\n`;
        conteudo += `***********************************************\n\n`;
        conteudo += `Cliente: ${this.nomeCliente}\n`;
        conteudo += `Data de Entrega: ${this.dataEntrega}\n\n`;
        
        conteudo += `--- DADOS DA AERONAVE ---\n`;
        conteudo += `Código: ${aeronave.codigo}\n`;
        conteudo += `Modelo: ${aeronave.modelo}\n`;
        conteudo += `Tipo: ${aeronave.tipo}\n`;
        conteudo += `Capacidade: ${aeronave.capacidade} passageiros\n`;
        conteudo += `Alcance: ${aeronave.alcance} km\n\n`;
        
        conteudo += `--- PEÇAS UTILIZADAS ---\n`;
        aeronave.pecas.forEach(p => {
            conteudo += `- ${p.nome} (Fornecedor: ${p.fornecedor}) - Status Final: ${p.status}\n`;
        });
        
        conteudo += `\n--- ETAPAS DE PRODUÇÃO REALIZADAS ---\n`;
        aeronave.etapas.forEach(e => {
            conteudo += `- ${e.nome} - Status: ${e.status}\n`;
        });
        
        conteudo += `\n--- RESULTADOS DOS TESTES ---\n`;
        aeronave.testes.forEach(t => {
            conteudo += `- Teste ${t.tipo}: ${t.resultado || 'Não executado'}\n`;
        });
        conteudo += `\n***********************************************\n`;
        
        console.log("Relatório gerado com sucesso.");
        return conteudo;
    }

    public salvarEmArquivo(conteudo: string, caminhoCompleto: string): void {
        try {
            fs.writeFileSync(caminhoCompleto, conteudo, 'utf-8');
            console.log(`\nSUCESSO: Relatório salvo em: ${caminhoCompleto}`);
        } catch (error) {
            console.error("ERRO: Falha ao salvar o relatório em arquivo.", error);
        }
}}