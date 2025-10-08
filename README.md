AEROCODE — Sistema de Produção Aeronáutica (CLI)

Repositório para entrega da AV1, contendo o sistema AEROCODE, desenvolvido em TypeScript com interface de linha de comando (CLI).
O sistema gerencia aeronaves, peças, etapas de produção, testes e funcionários, com níveis de permissão e autenticação de usuário.

 Requisitos do Ambiente

Antes de rodar o projeto, certifique-se de ter instalado:

Node.js — versão 18.x ou superior

TypeScript — versão 5.x ou superior

readline-sync — biblioteca utilizada para entrada de dados no terminal

 Instalação

Clone o repositório:

git clone https://github.com/leodaslb/AV1

cd AV1


Instale as dependências:

npm install


Caso ainda não tenha o TypeScript instalado globalmente:

npm install typescript @types/node @types/readline-sync --save-dev

 Como Executar o Projeto
🔹 Compilar os arquivos TypeScript
npm run build

🔹 Iniciar o sistema
npm start

Credenciais Padrão

O sistema já possui funcionários cadastrados.
Por padrão, o usuário Administrador é:

Usuário: admin
Senha: 1234


 Como já há funcionários cadastrados, o usuário padrão não aparece na interface CLI.
Utilize-o para acessar o sistema inicialmente.

 Navegação

Utilize os números exibidos nos menus para navegar entre as opções.

O botão padrão para voltar a um menu anterior é:

0
