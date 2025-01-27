## Temas Abordados neste Projeto K6

* Simulando vários usuários simultâneos
* Validando status code com Check
* Teste de Performance
* Teste de Fumaça
* Teste de Carga
* Teste de Extresse
* Implementações de métricas de tempo de requisição
* Implementação para geração de relatórios
* Implementação do GitHub Actions com o MongoDB Cloud + ServerRest
* Implementação WorkFlow Run Manual
* Implementação K6 Cloud

## Primeios passos após o clone do Projeto

* Realizar o clone do projeto na sua máquina e colocar o mesmo dentro de uma pasta chamada **projetos**
* Abrir o projeto no **Visual Studio Code** ou algum editdor de sua preferência
* No terminal rodar o comando: **npm install**
* Criar o arquivo **.env** conforme o arquivo de exemplo **env-example.txt**

# Comandos básicos para rodar o teste do K6

* **k6 run test.js** - Aqui o mesmo irá rodar um teste do arquivo conforme as configurações do mesmo
* **k6 run --vus 10 --duration 30s test.js** - Aqui o mesmo irá rodar um teste simulando 10 usuário mandando requisição durante 30 segundos

## Configuração para testes de API (localhost) + MongoDB Clound

* Após a configuração do K6 e do MongoDB Clound, o arquivo **.env** deve estar configurado com a credencial de acesso ao mongo

## Configuração para Projetos que não possui o K6 ou Projetos do Zero

* **Observações**: Seguir a documentação para a instalação do K6 no tópico abaixo (**Documentações de Referências**)

## Instalação das Tecnologias

* **Observações**: Se você já tiver o arquivo **package.json** o mesmo pode ser implementado as instruções em **devDependencies**
* **Observações**: Se você não tiver o arquivo **package.json** crie o com o comando: **npm init -y** e depois **npm install**

* Rodar o comando no terminal: **npm install @faker-js/faker --save-dev** para instalar o FakerJS
* Rodar o comando no terminal: **npm install cypress-mongodb --save-dev** para instalar o o MongoDB

## Documentações de Referências

* **k6** - https://grafana.com/docs/k6/latest/
* **MongoDB Clound** - https://cloud.mongodb.com/
* **MongoDB Compass** - https://www.mongodb.com/pt-br/docs/compass/current/install/
* **ServeRest** - https://serverest.dev/
* **Cron Guru** - https://crontab.guru/

## Ligando a API Localhost para teste com o MongoDB Clound

* **Observações** - Lembrando que é necessário realizar a etapa de configurações do MongoDB Clound antes deste processo

* **node app.js** - Irá ligar a API juntamente realizando a conexão com o MongoDB Clound 

## Teste de API sem MongoDB Clound

* O mesmo configurar o endereço da API nos arquivos de testes e realizar a implementação conforme cada regra

## Ligando a API Localhost para teste com o ServerRest

* Rodar o comando **npx serverest@latest** em um terminal do seu sistema operacional
