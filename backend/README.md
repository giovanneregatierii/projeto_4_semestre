```markdown
# 💈 API de Agendamento para Barbearia

API RESTful desenvolvida em **Node.js** e **MongoDB** para gerenciamento de agendamentos de uma barbearia.  
Permite criar, listar, atualizar e cancelar horários de atendimento de forma organizada e segura.

---

## 🚀 Tecnologias Principais
- **Node.js** + **Express**
- **MongoDB Atlas** (via Mongoose)
- **Nodemon** (ambiente de desenvolvimento)
- **Dotenv** (configuração de variáveis de ambiente)

---

## ⚙️ Funcionalidades Atuais
- Cadastro de agendamentos com validações básicas  
- Estrutura modular (Models, Routes, Services)  
- Conexão com banco de dados MongoDB  
- Registro de logs de operações

---

## 📁 Estrutura do Projeto
```

src/
├── config/          # Conexão e variáveis de ambiente
├── models/          # Modelos Mongoose
├── routes/          # Definição das rotas da API
├── services/        # Lógica de negócio
└── server.js        # Ponto de entrada do servidor

````

---

## ▶️ Como Executar Localmente
1. Clone este repositório  
   ```bash
   git clone https://github.com/seu-usuario/api-calendar.git
   cd api-calendar
````

2. Instale as dependências

   ```bash
   npm install
   ```
3. Configure o arquivo `.env` com sua `MONGO_URI`
4. Inicie o servidor

   ```bash
   npm run dev
   ```

Servidor rodará em: **[http://localhost:3000](http://localhost:3000)**

---

## 🧠 Próximos Passos

* Adicionar autenticação JWT
* Criar endpoints de cancelamento e atualização
* Implementar validação de conflito de horários
* Documentar com Swagger

---

## 📌 Sobre o Projeto

Este backend faz parte de um sistema completo de agendamento para barbearias, com foco em simplicidade e escalabilidade.

---

🛠️ Em desenvolvimento contínuo.

```

