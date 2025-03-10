<!-- filepath: c:\Users\AlineAparecidaPereir\Desktop\cadastro-backfront\cadastro-usuario\frontend\src\components\List\UserList.vue -->
<template>
    <div>
      <h1>Lista de Usuários</h1>
      <div class="user-list">
        <table>
          <thead>
            <tr>
              <th>Nome</th>
              <th>Email</th>
              <th>Tipo de Pessoa</th>
              <th>CPF/CNPJ</th>
              <th>Data de Nascimento/Fundação</th>
              <th>Telefone</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="user in users" :key="user.id">
              <td>{{ user.name }}</td>
              <td>{{ user.email }}</td>
              <td>{{ user.personType }}</td>
              <td>{{ user.cpf || user.cnpj }}</td>
              <td>{{ user.birthday || user.foundingDate }}</td>
              <td>{{ user.phone }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'UserList',
    data() {
      return {
        users: []
      };
    },
    created() {
      this.fetchUsers();
    },
    methods: {
      async fetchUsers() {
        try {
          const response = await fetch('http://localhost:3002/registration');
          if (!response.ok) {
            throw new Error('Erro ao buscar usuários');
          }
          const data = await response.json();
          this.users = data;
        } catch (error) {
          console.error('Erro:', error);
        }
      }
    }
  };
  </script>
  