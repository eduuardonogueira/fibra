# Fibra# Fibra

[![Deploy](https://img.shields.io/badge/Deploy-Vercel-000?logo=vercel)](https://fibra-flame.vercel.app/)
[![License](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Next.js](https://img.shields.io/badge/Frontend-Next.js-000?logo=nextdotjs)](https://nextjs.org/)
[![Spring Boot](https://img.shields.io/badge/Backend-SpringBoot-6DB33F?logo=springboot)](https://spring.io/projects/spring-boot)
[![MySQL](https://img.shields.io/badge/Database-MySQL-4479A1?logo=mysql)](https://www.mysql.com/)

**Fibra** é um sistema de agendamento simples e eficiente, onde clientes podem escolher um profissional, selecionar a data e o horário, e realizar seu agendamento de forma prática e rápida.

🔗 **Acesse o projeto:** [fibra-flame.vercel.app](https://fibra-flame.vercel.app/)

---

## ✨ Funcionalidades

- ✅ Visualização de profissionais disponíveis.
- ✅ Escolha de data e horário para agendamento.
- ✅ Sistema de gerenciamento de agendamentos para profissionais.
- ✅ Integração entre frontend e backend para uma experiência fluida.

---

## 🚀 Tecnologias utilizadas

- **Next.js** — Framework React para desenvolvimento do frontend.
- **Spring Boot** — Framework Java para construção da API REST no backend.
- **MySQL** — Banco de dados relacional para persistência das informações.

---

## 🛠️ Como executar o projeto

### ✅ Pré-requisitos

- Node.js e npm/yarn instalados.
- Java 17 ou superior.
- MySQL Server.

---

### ▶️ Passos

#### Backend (Spring Boot)

1. Clone o repositório e navegue até a pasta do backend.
2. Configure o arquivo `application.properties` com as credenciais do seu banco de dados MySQL.
3. Execute a aplicação com o comando:

```bash
./mvnw spring-boot:run
```

ou, caso use Gradle:

```bash
./gradlew bootRun
```

#### Frontend (Next.js)

1. Navegue até a pasta do frontend.
2. Instale as dependências:

```bash
npm install
ou
yarn install
```

3. Execute o servidor de desenvolvimento:

```bash
npm run dev
ou
yarn dev
```

4. Acesse: http://localhost:3000


### 📂 Estrutura do projeto

```bash
fibra/
├── backend/         # Aplicação Spring Boot
└── frontend/        # Aplicação Next.js
```

### 🤝 Contribuição
Sinta-se à vontade para contribuir! Abra uma issue ou envie um pull request com melhorias, correções ou novas funcionalidades.