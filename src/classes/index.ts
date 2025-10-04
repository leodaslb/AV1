import Aeronave from "./aeronave";
import Peca from "./peca";
import Etapa from "./etapa";
import Relatorio from "./relatorio";
import Teste from "./teste";
import Funcionario from "./funcionario.js";
import { TipoAeronave } from "../enums/tipoAeronave";
import { TipoPeca } from "../enums/tipoPeca";
import { StatusPeca } from "../enums/statusPeca";
import { NivelPermissao } from "../enums/nivelPermissao";
import { StatusEtapa } from "../enums/statusEtapa";
import { TipoTeste } from "../enums/tipoTeste";
import { ResultadoTeste } from "../enums/resultadoTeste";
import { menuAeronaves, menuPrincipal } from "./funcoes";
import SistemaProducao from "./sistema";
import readlineSync from 'readline-sync'

const sistema = new SistemaProducao()

sistema.carregarDados()


if (sistema.obterTodosFuncionarios().length === 0) {
    console.log("Nenhum usuário encontrado. Criando usuário 'admin' padrão...");
    sistema.cadastrarFuncionario(
        "1", "Admin", "999999999", "Rua X",
        "admin", "1234", NivelPermissao.Administrador
    );
    // Opcional: Salvar logo após criar o admin
    sistema.salvarDados(); 
}


let usuarioLogado: Funcionario | null = null;

// Loop de autenticação
let permissao = ''
let login = false
while (!usuarioLogado) {
    console.log("\n=== LOGIN ===");

    const usuario = readlineSync.question("Usuário: ");
    const senha = readlineSync.question("Senha: ");
    
    const funcionarioEncontrado = sistema.autenticar(usuario, senha);
    
    if (funcionarioEncontrado) {
        usuarioLogado = funcionarioEncontrado;
        login = true
        permissao = funcionarioEncontrado.nivelPermissao
        console.log(`\nBem-vindo, ${usuarioLogado.nome}!`);
    } else {
        console.log("Usuário ou senha inválidos. Tente novamente.");
    }
}
    




while (login) {
    menuPrincipal()
    const opcao = readlineSync.question('Escolha uma das opções: ')
    console.log('------------------------------')

    switch (opcao) {
        case '1':{
            menuAeronaves()
            const opcaoAeronave = readlineSync.question('Escolha uma das opções: ')
            console.log('------------------------------')
            switch (opcaoAeronave) {
                case '1': {
                    if(permissao == NivelPermissao.Operador){
                        console.log('Seu nivel de permissao não permite cadastrar uma nova aeronave')
                        break
                    }
                    const codigo = readlineSync.question('Digite o codigo da Aeronave: ')
                    const modelo = readlineSync.question('Digite o modelo da Aeronave: ')
                    const capacidade = parseInt(readlineSync.question('Digite a capacidade de passageiros: '))
                    const alcance = parseInt(readlineSync.question('Digite o alcance (km): '))
                    const tipoNum = readlineSync.keyInSelect([TipoAeronave.Comercial, TipoAeronave.Militar], "Qual o tipo?");
                    if( tipoNum === -1) {
                        console.log("Cadastro cancelado pelo Usuario.")
                        break
                    }
                    const tipo = (tipoNum === 0 ) ? TipoAeronave.Comercial : TipoAeronave.Militar;
                    sistema.cadastrarAeronave(codigo, modelo,tipo,  capacidade, alcance)
                }
                    break;

                case '2':{
                    sistema.listarAeronaves()
                    break
                }
                case '3':{
                    const codigoAeronave = readlineSync.question('Digite o codigo da Aeronave: ')
                    const nomePeca = readlineSync.question('Digite o Nome da peça: ')
                    const tipoNum = readlineSync.keyInSelect([TipoPeca.Importada, TipoPeca.Nacional], "Qual o tipo?");
                    if( tipoNum === -1) {
                        console.log("Cadastro cancelado pelo Usuario.")
                        break
                        
                    }
                    const tipo = (tipoNum === 0 ) ? TipoPeca.Importada : TipoPeca.Nacional
                    const fornecedor = readlineSync.question('Digite o Nome do fornecedor: ')
                    const opcoes = [StatusPeca.EmProducao, StatusPeca.EmTransporte, StatusPeca.Pronta]
                    const statusNum = readlineSync.keyInSelect(opcoes, "Qual o tipo?");
                    if( statusNum=== -1) {
                        console.log("Cadastro cancelado pelo Usuario.")
                        break
                        
                    }
                    const status = opcoes[statusNum]
                    console.log("Status escolhido:", status)
                    
                    sistema.adicionarPecaEmAeronave(codigoAeronave,nomePeca, tipo, fornecedor, status)
                    
                    }
                    break
                case '4':{
                    const codigoAeronave = readlineSync.question('Digite o codigo da Aeronave: ')
                    const nomeEtapa = readlineSync.question('Digite o Nome da Etapa: ')
                    const prazo = readlineSync.question('Digite o prazo da Etapa: ')
                    sistema.adicionarEtapaEmAeronave(codigoAeronave, nomeEtapa, prazo)
                    }
                    break

                case '5':{
                    const codigoAeronave = readlineSync.question('Digite o codigo da Aeronave: ')
                    const opcoes = [TipoTeste.Aerodinamico, TipoTeste.Eletrico, TipoTeste.Hidraulico]
                    const tipoNum = readlineSync.keyInSelect(opcoes, "Qual o tipo?");
                    if( tipoNum=== -1) {
                        console.log("Cadastro cancelado pelo Usuario.")
                        break
                        
                    }
                    const tipo = opcoes[tipoNum]
                    console.log("Status escolhido:", tipo)

                    sistema.adicionarTesteEmAeronave(codigoAeronave,tipo)
                }
                    break

               
                
                case '6':{
                    const codigoAeronave = readlineSync.question('Digite o codigo da Aeronave: ')
                    const opcoes = [TipoTeste.Aerodinamico, TipoTeste.Eletrico, TipoTeste.Hidraulico]
                    const tipoNum = readlineSync.keyInSelect(opcoes, "Qual o tipo?");
                    if( tipoNum=== -1) {
                        console.log("Cadastro cancelado pelo Usuario.")
                        break
                        
                    }
                    const tipo = opcoes[tipoNum]
                    console.log("Status escolhido:", tipo)
                    const resultadoNum = readlineSync.keyInSelect([ResultadoTeste.Aprovado, ResultadoTeste.Reprovado], "Qual o resultado?");
                    if( resultadoNum === -1) {
                        console.log("Cadastro cancelado pelo Usuario.")
                        break
                        
                    }
                    const resultado = (resultadoNum === 0 ) ? ResultadoTeste.Aprovado : ResultadoTeste.Reprovado

                    sistema.executarTesteEmAeronave(codigoAeronave,tipo,resultado)
                    break

                }

                case '7':{
                     const codigoAeronave = readlineSync.question('Digite o codigo da Aeronave: ')
                     const nomeEtapa = readlineSync.question('Qual o nome da etapa?: ')
                     sistema.iniciarEtapaEmAeronave(codigoAeronave, nomeEtapa)
                     break
                }
                case '8':{
                    const codigoAeronave = readlineSync.question('Digite o codigo da Aeronave: ')
                    const nomeEtapa = readlineSync.question('Qual o nome da etapa?: ')
                    sistema.finalizarEtapaEmAeronave(codigoAeronave, nomeEtapa)
                    break
                }

                 case'9':{
                    const codigoAeronave = readlineSync.question('Digite o codigo da Aeronave: ')
                    sistema.detalhesAeronave(codigoAeronave)
                }
                    break
                    
                case '10':{
                        sistema.listarFuncionarios()
                        const codigoAeronave = readlineSync.question('Digite o codigo da Aeronave: ')
                        const nomeEtapa = readlineSync.question('Qual o nome da etapa?: ')
                        const idFunc = readlineSync.question('Digite o id do funcionario q deseja associar a etapa ', nomeEtapa,':')

                        sistema.associarFuncionarioAEtapa(codigoAeronave, nomeEtapa, idFunc)

                        break

                }
                
                case '11' :{
                        console.log("\n--- Gerar Relatório Final da Aeronave ---");
                        
                        sistema.listarAeronaves();
                        
                        const codigo = readlineSync.question("Digite o codigo da aeronave para gerar o relatorio: ");
                        const nomeCliente = readlineSync.question("Digite o nome do cliente: ");

                        sistema.gerarRelatorioDeAeronave(codigo, nomeCliente);
                    }
                    break
                
            
                default :
                    console.log('Opção invalida')
                    
                    
            }
        }
            break;
        case '2': {
                if(permissao != NivelPermissao.Administrador){
                        console.log('\n Seu nivel de permissao não permite cadastrar Funcionarios')
                        console.log('---------------------------------------------')
                        break
                    }

                const id = readlineSync.question('Digite o codigo do funcionario: ')
                const nome = readlineSync.question('Digite o nome do funcionario: ')
                const telefone = readlineSync.question('Digite o telefone do funcionario: ')
                const endereco = readlineSync.question('Digite o endereço do funcionario : ')
                const usuario = readlineSync.question('Digite o Usuario do funcionario (este usuario sera usado para login):')
                const senha = readlineSync.question('Digite a senha do Funcionario: ')
                const opcoes = [NivelPermissao.Administrador, NivelPermissao.Engenheiro, NivelPermissao.Operador]
                const permissaoNum = readlineSync.keyInSelect(opcoes, "Qual o tipo?");
                if( permissaoNum === -1) {
                    console.log("Cadastro cancelado pelo Usuario. \n")
                    break
                        
                }
                const nivelPermissao = opcoes[permissaoNum]
                console.log("Status escolhido:", nivelPermissao,'\n')

                sistema.cadastrarFuncionario(id,nome, telefone, endereco, usuario, senha, nivelPermissao)

                }

            break

        case '3':
            sistema.salvarDados();
            break;

        case '0':
            sistema.salvarDados();
            login = false
            console.log("Saindo do sistema...");
            break;
        

            
        default:
            console.log('Opção Invalida \n')
            break
    }

}




