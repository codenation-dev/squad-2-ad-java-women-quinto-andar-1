![Sherlog_Final_001](https://user-images.githubusercontent.com/44944954/69479367-2819cd80-0ddb-11ea-8028-0bf953ab46d1.png)

Sherlog é uma plataforma que centraliza o gerenciamento de logs de diversos sistemas de uma empresa em um mesmo local. Sua interface permite a visualização de logs separados por ambiente e apresenta um sistema de busca e ordenação. A aplicação ainda possibilida que logs sejam arquivados e deletados dentro da plataforma.

Projeto desenvolvido em React como uma SPA (single page application) responsiva com backend desenvolvido em Spring e banco de dados em PostgreSQL. 

Esse projeto é o trabalho final do Squad 2 do curso AceleraDev Java Women promovido pela Codenation em parceria com o Quinto Andar entre setembro e novembro de 2019.

## Links dos projetos (front, back e documentação da API)

![85a24068-0635-4531-989c-12cc61600181](https://user-images.githubusercontent.com/44944954/69479460-1553c880-0ddc-11ea-9b9f-70eb3ecaf0fa.jpg) 

Endereço da API: [Sherlog API](https://centraldeerros.firebaseapp.com/)

Documentação da API: [Postman](https://documenter.getpostman.com/view/7926794/SW7c2T4B?version=latest)

Para executar os projetos localmente, siga as instruções contidas em seus READMEs, disponíveis dentro das pastas /backend e /frontend.

## O Desafio

Em projetos modernos é cada vez mais comum o uso de arquiteturas baseadas em serviços ou microsserviços. Nestes ambientes complexos, erros podem surgir em diferentes camadas da aplicação (backend, frontend, mobile, desktop) e mesmo em serviços distintos. Desta forma, é muito importante que os desenvolvedores possam centralizar todos os registros de erros em um local, de onde podem monitorar e tomar decisões mais acertadas. Neste projeto vamos implementar um sistema para centralizar registros de erros de aplicações.

## Requisitos

### Backend - API
- criar endpoints para serem usados pelo frontend da aplicação
- criar um endpoint que será usado para gravar os logs de erro em um banco de dados relacional
a API deve ser segura, permitindo acesso apenas com um token de autenticação válido
### Frontend
- deve implementar as funcionalidades apresentadas nos wireframes
- deve ser acessada adequadamente tanto por navegadores desktop quanto mobile
- deve consumir a API do produto
- desenvolvida na forma de uma Single Page Application

## Tecnologias utilizadas

### Back
- Spring
- Java
- PostgreSQL
- Heroku 
- GitHub
- Postman
### Front
- Firebase
- Github
- React
- Sass
- Axios
- SweetAlert
- Javascript
- CSS
- HTML

## Wireframes

Wireframes da aplicação disponibilizados pela Codenation:

<img width="1028" alt="1-cadastro" src="https://user-images.githubusercontent.com/44944954/69479518-ef7af380-0ddc-11ea-9815-4d1499d252e6.png">
<img width="1028" alt="2-login" src="https://user-images.githubusercontent.com/44944954/69479519-ef7af380-0ddc-11ea-831b-33bc40370fef.png">
<img width="1027" alt="3-dashboard" src="https://user-images.githubusercontent.com/44944954/69479520-ef7af380-0ddc-11ea-8845-9d51ba977013.png">
<img width="1028" alt="4-ambientes" src="https://user-images.githubusercontent.com/44944954/69479521-ef7af380-0ddc-11ea-8fae-24d2e03e6f9c.png">
<img width="1027" alt="5-order" src="https://user-images.githubusercontent.com/44944954/69479522-f0138a00-0ddc-11ea-82c9-365364e615ad.png">
<img width="1026" alt="6-filtro" src="https://user-images.githubusercontent.com/44944954/69479523-f0138a00-0ddc-11ea-9e86-740b9169c9f8.png">
<img width="1032" alt="7-detalhes" src="https://user-images.githubusercontent.com/44944954/69479524-f0138a00-0ddc-11ea-8e6c-1519bae8d082.png">

## Organização

Escolhemos o trello para organizar nossas tarefas, seguindo um modelo simples de kanban.

<img width="959" alt="Trello" src="https://user-images.githubusercontent.com/44944954/69479573-88aa0a00-0ddd-11ea-94cc-3a1907e68dac.PNG">

## Histórico

### Versão 1.0.0 - MVP

Primeira versão do projeto entregue em 23/11/2019. Nesta versão estão disponíveis as seguintes funcionalidades:

#### Frontend:

- Cadastro de usuário por nome, e-mail e senha; :heavy_check_mark: 

- Login de usuário por e-mail e senha; :heavy_check_mark: 

- Autenticação de usuário para as páginas internas da aplicação por meio de um token JWT gerado pelo backend e com duração de 1h; :heavy_check_mark: 

- Visualização de lista de logs separados por ambiente (Produção, Homolog e Desenvolvimento); :heavy_check_mark: 

- Ordenação dos logs por nível de criticidade e frequência; :heavy_check_mark: 

- Busca de logs por nível de criticidade, descrição e origem; :heavy_check_mark: 

- Possibilidade de arquivar e deletar logs; :heavy_check_mark: 

- Visualizar os detalhes de um log; :heavy_check_mark: 

- Central de notificação de erros; :heavy_check_mark: 

- Páginas de erros 404 (não encontrada) e 500 (erro de servidor); :heavy_check_mark: 

- Design responsivo; :heavy_check_mark: 

- Rotas desenvolvidas como SPA. :heavy_check_mark: 

#### Backend:

- Criação dos Endpoints :heavy_check_mark:

- Criação do banco de dados PostgreSQL :heavy_check_mark:

- Implementação de Autenticação JWT :heavy_check_mark:

- Tratamento de Erros e Exceptions :heavy_check_mark:

- Deploy no Heroku :heavy_check_mark:


## O Squad

Trabalho desenvolvido por:

- [@Erica19](https://github.com/Erica19)

- [@JakSakuma](https://github.com/JakSakuma)

- [@gomesjeise](https://github.com/gomesjeise)

- [@marciapsilva](https://github.com/marciapsilva)

- [@moromimay](https://github.com/moromimay)
