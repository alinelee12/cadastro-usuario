# Cadastro de Usuário

Este projeto é uma aplicação de cadastro de usuários desenvolvida com Vue 3 e Vite no frontend, e uma API backend para gerenciar os dados dos usuários.

## Tecnologias Utilizadas

- **Frontend:**
  - Vue 3
  - Vite
  - Vue Router
  - Axios (para requisições HTTP)
  - bcryptjs (para hash de senhas)
  - FontAwesome (para ícones)

- **Backend:**
  - JSON Server (para simular uma API REST)

## Estrutura do Projeto

```
cadastro-usuario/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Forms/
│   │   │   │   ├── FormPassword.vue
│   │   │   │   ├── FormPerson.vue
│   │   │   │   ├── FormInicial.vue
│   │   │   │   ├── FormReview.vue
│   │   │   ├── List/
│   │   │   │   ├── UserList.vue
│   │   ├── views/
│   │   │   ├── HomeView.vue
│   │   │   ├── ListView.vue
│   │   ├── router/
│   │   │   ├── index.js
│   │   ├── App.vue
│   │   ├── main.js
├── backend/
│   ├── db.json
├── README.md
```

## Configuração do Projeto

### Pré-requisitos

- Node.js (versão 14 ou superior)
- npm (gerenciador de pacotes do Node.js)

### Configuração do Frontend

1. Navegue até o diretório `frontend`:
   ```sh
   cd frontend
   ```

2. Instale as dependências:
   ```sh
   npm install
   ```

3. Execute o servidor de desenvolvimento:
   ```sh
   npm run dev
   ```

4. Abra o navegador e acesse `http://localhost:3000`.

### Configuração do Backend

1. Navegue até o diretório `backend`:
   ```sh
   cd backend
   ```

2. Instale o JSON Server globalmente (se ainda não estiver instalado):
   ```sh
   npm install -g json-server
   ```

3. Inicie o JSON Server:
   ```sh
   json-server --watch db.json --port 3002
   ```

4. A API estará disponível em `http://localhost:3002`.

## Funcionalidades

### Cadastro de Usuários:

- Cadastro de pessoa física e jurídica.
- Validação de dados (CPF, CNPJ, data de nascimento, data de fundação, telefone, senha).


### Listagem de Usuários:

- Visualização dos usuários cadastrados.


## Estrutura dos Componentes

### Formulários:

- **FormInicial.vue:** Formulário inicial para selecionar o tipo de pessoa e inserir o email.
- **FormPerson.vue:** Formulário para inserir os dados pessoais ou empresariais.
- **FormPassword.vue:** Formulário para inserir e validar a senha.
- **FormReview.vue:** Revisão dos dados antes de finalizar o cadastro.

### Listagem:

- **UserList.vue:** Componente para listar os usuários cadastrados.

## Rotas

- `/` : Página inicial.
- `/registration` : Página de cadastro de usuários.
- `/users` : Página de listagem de usuários.

## Contribuição

Se você deseja contribuir com este projeto, siga os passos abaixo:

1. Faça um fork do repositório.
2. Crie uma branch para sua feature:
   ```sh
   git checkout -b feature/nova-feature
   ```
3. Commit suas mudanças:
   ```sh
   git commit -m 'Adiciona nova feature'
   ```
4. Faça um push para a branch:
   ```sh
   git push origin feature/nova-feature
   ```
5. Abra um Pull Request.

## Licença

Este projeto está licenciado sob a licença MIT. Veja o arquivo LICENSE para mais detalhes.

## Contato

Se você tiver alguma dúvida ou sugestão, sinta-se à vontade para entrar em contato:

Email: alineleeap@gmail.com
