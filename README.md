# 🎓 API REST RemindMe

Projeto para validar conceitos referente ao desenvolvimento mobile, proposto pelo professor Diogo Rodrigues da disciplina de **Desenvolvimento de Aplicativos para Dispositivos Móveis** da Pós-Graduação de **Engenharia de Software 2024.1** do Centro Universitário Frassinetti do Recife (**UniFAFIRE**).

A RemindME API é uma interface REST desenvolvida em TypeScript com Node.js(Express), projetada para o gerenciamento de lembretes personalizáveis. Sua arquitetura segue o padrão em camadas (entities, controllers, services, repositories), com suporte à injeção de dependências.
A persistência de dados é realizada através do MySQL, com uso do ORM Prisma para acesso e manipulação de dados.

Além das operações CRUD, a API também oferece suporte à criação de notificações push, utilizando o modelo Web Push API. Essa funcionalidade permite disparos automatizados de alertas com base na data e hora configuradas.

---

## 📌 Funcionalidades

- ✅ Criação de **Lembretes** com título, categoria, descrição, *data, *hora e cor.
- ✅ Edição, consulta e exclusão de **Lembretes**.
- ✅ Criação de **Notificações Push**

---

## 🧱 Tecnologias Utilizadas

- **Node.js**
- **Express.js**
- **Typescript**
- **ORM Prisma**
- **Swagger / OpenAPI 3 (swagger-autogen)**

---

## 🏃 Como executar o projeto

#### 1. Clone o projeto:

```bash
  git clone https://github.com/amavlopes/remindme-rest-api.git
```

#### 2. Entre no diretório do projeto:

```bash
  cd remindme-rest-api
```

#### 3. Instale todas as dependências:

```bash
  npm install
```

#### 4. Configure as variáveis de ambiente

##### Crie um arquivo .env com base no .env-example:

```bash
APP_PORT = 7000

ENABLED_CORS = http://localhost:7000,http://localhost:4200

DATABASE_URL = mysql://usuario:senha@localhost:3306/nome_do_banco

```

#### 5. Crie o banco de dados executando o comando:

```bash
  npm run prisma-create-db
```

#### 6. (Opcional) Para popular o banco de dados execute o comando:

```bash
  npm run prisma-seed
```

#### 7. Execute a aplicação:

```bash
  npm run start
```

---

## 🔍 Documentação do Swagger

#### Após executar a API, acesse a documentação interativa:

```bash
  http://localhost:7000/docs
```

---

## 🔄 Mantendo o banco atualizado

#### Sempre que fizer alterações no arquivo prisma/schema.prisma:

##### Crie e execute uma migration:

```bash
  npm run prisma-migrate -- [nome_da_migration]
```

---

⌨️ com ❤️ por [Amanda Avelino](https://github.com/amavlopes) 😊
