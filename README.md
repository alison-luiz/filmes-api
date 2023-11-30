## Filmes API

Filmes API é um projeto para qualificar minhas habilidades de backend utilizando o framework NestJS.

## Instalação


[Docker](https://www.docker.com/) - Opcional - Para você executar tudo sem esforço

[Yarn](https://yarnpkg.com/) - Obrigatório

[PostgreSQL](https://www.postgresql.org/) - Opcional - Caso você execute sem docker


## Iniciando o projeto

#### Caso escolha a opção de rodar o projeto local

```bash
$ git clone https://github.com/alison-luiz/filmes-api.git
```

#### Criar o arquivo do environment na pasta raiz do projeto
```bash
Copiar o arquivo .env.example para .env
Preencher as informações JWT_SECRET e DATABASE_URL
```

#### Usar o gerenciador de pacotes [Yarn](https://yarnpkg.com/) para executar o backend em modo de desenvolvimento

```bash
$ yarn
$ yarn start:dev
```

#### Usar o gerenciador de pacotes [Yarn](https://yarnpkg.com/) para executar o backend em modo de produção

```bash
$ yarn
$ yarn build
$ yarn start:prod
```

#### Usar o docker-compose.yml para executar o projeto sem esforço (na pasta raiz)

```bash
$ docker compose up
```

## Documentação/Endpoints

#### Usando a biblioteca Swagger foi documentado todas as rotas do projeto

```bash
http://localhost:3000/docs # Para execução do projeto local
https://filmes-api.onrender.com/docs # Para documentação do projeto em deploy
```

## Testes

#### Para executar os testes do backend, na pasta raiz do projeto execute o comando:
```bash
$ yarn test
```

## Build de Produção

O projeto atual na sua versão de produção está sendo executado na plataforma [Render](https://render.com/) na URL `https://filmes-api.onrender.com` e os endpoints pode ser acessado na [documentação](https://filmes-api.onrender.com/docs)
