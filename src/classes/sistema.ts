import { NivelPermissao } from "../enums/nivelPermissao";
import { ResultadoTeste } from "../enums/resultadoTeste";
import { StatusEtapa } from "../enums/statusEtapa";
import { StatusPeca } from "../enums/statusPeca";
import { TipoAeronave } from "../enums/tipoAeronave";
import { TipoPeca } from "../enums/tipoPeca";
import { TipoTeste } from "../enums/tipoTeste";
import Aeronave from "./aeronave";
import Etapa from "./etapa";
import Funcionario from "./funcionario";
import Peca from "./peca";
import Teste from "./teste";
import * as fs from 'fs'; 
import * as path from 'path';
import Relatorio from "./relatorio";


export default class SistemaProducao {
    private aeronaves : Aeronave[] = []
    private funcionarios: Funcionario[] = []

    constructor(){

        console.log('sistema de cadastro AEROCODE')

    }

    public autenticar(usuario: string, senha: string): Funcionario | null {
        const funcionario = this.funcionarios.find(f => f.usuario === usuario)
        if (funcionario && funcionario.autenticar(usuario, senha)) {
        return funcionario;
    }
        return null;}

    public obterTodosFuncionarios(): Funcionario[] {
        return this.funcionarios;
    }

    public cadastrarAeronave (codigo: string, modelo: string, tipo: TipoAeronave,
        capacidade: number, alcance: number): Aeronave | undefined {
             const jaExiste = this.encontrarAeronavePorCodigo(codigo);
        if (jaExiste) {
            console.error(`ERRO: Já existe uma aeronave com o código ${codigo}.`);
            return undefined;
        }
        const novaAeronave = new Aeronave(codigo, modelo, tipo, capacidade, alcance);
        this.aeronaves.push(novaAeronave);
        console.log(`SUCESSO: Aeronave ${modelo} - codigo:(${codigo}) cadastrada.`);
        return novaAeronave;
        }


    cadastrarFuncionario(
        id: string, nome: string, telefone: string, endereco: string,
        usuario: string, senha: string, nivelPermissao: NivelPermissao
    ): Funcionario | undefined {
        const jaExiste = this.funcionarios.find(f => f.id === id);
        if (jaExiste) {
            console.error(`ERRO: Já existe um funcionário com o ID ${id}.`);
            return undefined;
        }

        const novoFuncionario = new Funcionario(id, nome, telefone, endereco, usuario, senha, nivelPermissao);
        this.funcionarios.push(novoFuncionario);
        console.log(`SUCESSO: Funcionário ${nome} cadastrado.`);
        return novoFuncionario;
    }
    // função para validar codigo existente
    public encontrarAeronavePorCodigo(codigo: string): Aeronave | undefined {
        return this.aeronaves.find(a => a.codigo === codigo);
    }


    //  usar regras da atividade, validar aeronave para add peça

    public adicionarPecaEmAeronave(
        codigoAeronave: string, nomePeca: string, tipo: TipoPeca,
        fornecedor: string, status: StatusPeca
    ): void {
        const aeronave = this.encontrarAeronavePorCodigo(codigoAeronave);

        if (!aeronave) {
            console.error(`ERRO: Aeronave com código ${codigoAeronave} não encontrada.`);
            return;
        }


        const novaPeca = new Peca(nomePeca, tipo, fornecedor, status);
        aeronave.adicionarPeca(novaPeca); // O Sistema CHAMA o método do modelo.
    }

    

    

    public adicionarEtapaEmAeronave(
        codigoAeronave: string, nomeEtapa: string,prazo: string, 
    ): void {
        const aeronave = this.encontrarAeronavePorCodigo(codigoAeronave);

        if (!aeronave) {
            console.error(`ERRO: Aeronave com código ${codigoAeronave} não encontrada.`);
            return;
        }

        const novaEtapa = new Etapa(nomeEtapa, prazo, StatusEtapa.Pendente);
        aeronave.adicionarEtapa(novaEtapa);
    }

    public iniciarEtapaEmAeronave(codigoAeronave: string,nomeEtapa:string ): void{
        const aeronave = this.encontrarAeronavePorCodigo(codigoAeronave);

        if (!aeronave) {
            console.error(`ERRO: Aeronave com código ${codigoAeronave} não encontrada.`);
            return;
        }

        const etapa = aeronave.etapas.find(e => e.nome.toLocaleLowerCase() === nomeEtapa.toLocaleLowerCase())
        if (!etapa){
            console.error(`ERRO: Etapa ${nomeEtapa} não encontrada`)
            return;
        }

        etapa.iniciar();
    
    }
    
    public finalizarEtapaEmAeronave(codigoAeronave: string,nomeEtapa:string ): void{
        const aeronave = this.encontrarAeronavePorCodigo(codigoAeronave);

        if (!aeronave) {
            console.error(`ERRO: Aeronave com código ${codigoAeronave} não encontrada.`);
            return;
        }

        const etapa = aeronave.etapas.find(e => e.nome.toLocaleLowerCase() === nomeEtapa.toLocaleLowerCase())
        if (!etapa){
            console.error(`ERRO: Etapa ${nomeEtapa} não encontrada`)
            return;
        }

        etapa.finalizar();
    
    }

    public listarFuncionarios() : void{
        console.log('======= Lista de Funcionarios ========')

        if (this.funcionarios.length === 0) {
            console.log("Nenhum funcionário cadastrado no sistema.");
            return;
        }
        this.funcionarios.forEach(f => {
            console.log(`- ID: ${f.id} | Nome: ${f.nome} | Permissão: ${f.nivelPermissao}`);
        });
        console.log("-------------------------------------------\n");
    }

    
    public associarFuncionarioAEtapa(
        codigoAeronave: string, 
        nomeEtapa: string, 
        idFuncionario: string
    ): void {
    
        const aeronave = this.encontrarAeronavePorCodigo(codigoAeronave);
        if (!aeronave) {
            console.error(`ERRO: Aeronave com código ${codigoAeronave} não encontrada.`);
            return;
        }

        
        const etapa = aeronave.etapas.find(e => e.nome.toLowerCase() === nomeEtapa.toLowerCase());
        if (!etapa) {
            console.error(`ERRO: Etapa '${nomeEtapa}' não encontrada na aeronave ${codigoAeronave}.`);
            return;
        }

        
        const funcionario = this.funcionarios.find(f => f.id === idFuncionario);
        if (!funcionario) {
            console.error(`ERRO: Funcionário com ID ${idFuncionario} não encontrado.`);
            return;
        }
        
        // Verificar se o funcionário já não está na etapa
        const jaAssociado = etapa.funcionarios.some(f => f.id === idFuncionario);
        if(jaAssociado) {
            console.warn(`Atenção: O funcionário ${funcionario.nome} já está associado a esta etapa.`);
            return;
        }

       
        etapa.associarFuncionario(funcionario);
    }
    

    
    
    public adicionarTesteEmAeronave(
        codigoAeronave: string, tipo: TipoTeste
    ): void {
        const aeronave = this.encontrarAeronavePorCodigo(codigoAeronave);

        if (!aeronave) {
            console.error(`ERRO: Aeronave com código ${codigoAeronave} não encontrada.`);
            return;
        }

        const novoTeste = new Teste(tipo);
        aeronave.adicionarTeste(novoTeste);
    }

    public executarTesteEmAeronave(codigoAeronave,tipo:TipoTeste, resultado:ResultadoTeste): void{
        const aeronave = this.encontrarAeronavePorCodigo(codigoAeronave);

        if (!aeronave) {
            console.error(`ERRO: Aeronave com código ${codigoAeronave} não encontrada.`);
            return;
        }

        const teste = aeronave.testes.find(t => t.tipo === tipo)
        if (!teste){
            console.error(`ERRO: Teste ${tipo} não encontrado`)
            return;
        }

        teste.executar(resultado);
    
    }
    


    public detalhesAeronave(
        codigoAeronave: string, 
    ): void {
        const aeronave = this.encontrarAeronavePorCodigo(codigoAeronave);

        if (!aeronave) {
            console.error(`ERRO: Aeronave com código ${codigoAeronave} não encontrada.`);
            return;
        }

        
        aeronave.detalhes()
    }

    public listarAeronaves(): void {
        console.log("\n--- LISTA DE AERONAVES CADASTRADAS ---");
        if (this.aeronaves.length === 0) {
            console.log("Nenhuma aeronave cadastrada no sistema.");
            return;
        }
        this.aeronaves.forEach(a => {
            console.log(`- Código: ${a.codigo} | Modelo: ${a.modelo} | Tipo: ${a.tipo}`);
        });
        console.log("-------------------------------------\n");
    }

   
     public gerarRelatorioDeAeronave(
        codigoAeronave: string, 
        nomeCliente: string
    ): void {
        const aeronave = this.encontrarAeronavePorCodigo(codigoAeronave);
        if (!aeronave) {
            console.error(`ERRO: Aeronave com código ${codigoAeronave} não encontrada.`);
            return;
        }
        
        // REGRA DE NEGÓCIO: Verificar se todas as etapas estão concluídas
        const todasEtapasConcluidas = aeronave.etapas.every(e => e.status === StatusEtapa.Concluida);
        if(!todasEtapasConcluidas || aeronave.etapas.length === 0) {
            console.error(`ERRO: Não é possível gerar o relatório.`);
            console.error("Motivo: Nem todas as etapas de produção foram concluídas.");
            return;
        }

        const relatorio = new Relatorio(nomeCliente, new Date()); // Usa a data atual
        
        const conteudoRelatorio = relatorio.gerarRelatorio(aeronave);
        
        // Criando o nome do arquivo de forma segura
        const nomeArquivo = `relatorio_${aeronave.codigo}.txt`;
        const diretorioRelatorios = path.join(__dirname, '..', 'relatorios'); // Salva numa pasta 'relatorios' na raiz

        // Garante que o diretório exista
        if (!fs.existsSync(diretorioRelatorios)){
            fs.mkdirSync(diretorioRelatorios);
        }

        const caminhoCompleto = path.join(diretorioRelatorios, nomeArquivo);
        
        // Usando o método do Relatorio para salvar (que usa o 'fs')
        relatorio.salvarEmArquivo(conteudoRelatorio, caminhoCompleto);
    }

    private readonly caminhoDados = path.join(__dirname, '..', 'dados');
    private readonly arquivoAeronaves = path.join(this.caminhoDados, 'aeronaves.json');
    private readonly arquivoFuncionarios = path.join(this.caminhoDados, 'funcionarios.json');

    private garantirDiretorioDeDados(): void {
        if (!fs.existsSync(this.caminhoDados)){
            fs.mkdirSync(this.caminhoDados);
        }
    }

    // MÉTODO DE SALVAMENTO REAL
    public salvarDados(): void {
        console.log("\nSalvando dados do sistema...");
        this.garantirDiretorioDeDados();

        try {
            // Converte os arrays de objetos para uma string no formato JSON
            const dadosAeronaves = JSON.stringify(this.aeronaves, null, 2);
            const dadosFuncionarios = JSON.stringify(this.funcionarios, null, 2);

            fs.writeFileSync(this.arquivoAeronaves, dadosAeronaves, 'utf-8');
            fs.writeFileSync(this.arquivoFuncionarios, dadosFuncionarios, 'utf-8');
            console.log("Dados salvos com sucesso!");
        } catch (error) {
            console.error("ERRO: Falha ao salvar os dados.", error);
        }
    }

    // MÉTODO DE CARREGAMENTO REAL
    public carregarDados(): void {
        console.log("\nCarregando dados do sistema...");

        try {
            if (fs.existsSync(this.arquivoAeronaves)) {
                const dados = fs.readFileSync(this.arquivoAeronaves, 'utf-8');
                const aeronavesSalvas = JSON.parse(dados);
                // IMPORTANTE: Re-instanciar os objetos para que tenham seus métodos
                this.aeronaves = aeronavesSalvas.map((a: any) => {
                    const aeronave = new Aeronave(a.codigo, a.modelo, a.tipo, a.capacidade, a.alcance);
                    // Aqui teríamos que recarregar peças, etapas, etc. também
                    return aeronave;
                });
            }

            if (fs.existsSync(this.arquivoFuncionarios)) {
                const dados = fs.readFileSync(this.arquivoFuncionarios, 'utf-8');
                const funcionariosSalvos = JSON.parse(dados);
                this.funcionarios = funcionariosSalvos.map((f: any) => 
                    new Funcionario(f.id, f.nome, f.telefone, f.endereco, f.usuario, f.senha, f.nivelPermissao)
                );
            }
            console.log("Dados carregados com sucesso!");
        } catch (error) {
            console.error("ERRO: Falha ao carregar os dados.", error);
            // Inicia com listas vazias se houver erro
            this.aeronaves = [];
            this.funcionarios = [];
        }
    }
    

}
