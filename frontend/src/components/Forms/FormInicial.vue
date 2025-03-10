<!-- filepath: c:\Users\AlineAparecidaPereir\Desktop\cadastro-backfront\cadastro-usuario\frontend\src\components\Forms\FormInicial.vue -->
<template>
  <form @submit.prevent="handleSubmit">
    <Title text="Seja bem vindo(a)" />
    <div class="input-container">
      <label for="email">Endereço de e-mail:</label>
      <input type="email" id="email" :value="email" @input="validateEmail">
      <span v-if="emailError" class="error">{{ emailError }}</span>
    </div>
    <div class="input-container--checkbox">
      <div>
        <input type="checkbox" id="pessoaFisica" :checked="personType === 'Pessoa física'" @change="updatepersonType('Pessoa física')">
        <label for="pessoaFisica">Pessoa Física</label>
      </div>
      <div>
        <input type="checkbox" id="pessoaJuridica" :checked="personType === 'Pessoa jurídica'" @change="updatepersonType('Pessoa jurídica')">
        <label for="pessoaJuridica">Pessoa Jurídica</label>
      </div>
    </div>
  </form>
</template>

<script>
import Title from '../Titles/StepperTitles.vue';

export default {
  name: 'FormInicial',
  components: {
    Title
  },
  props: ['email', 'personType'],
  data() {
    return {
      emailError: ''
    };
  },
  methods: {
    validateEmail(event) {
      const email = event.target.value;
      this.$emit('update:email', email);
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(email)) {
        this.emailError = 'Por favor, insira um email válido.';
      } else {
        this.emailError = '';
      }
    },
    updatepersonType(tipo) {
      this.$emit('update:personType', tipo);
    },
    handleSubmit() {
      if (this.emailError === '' && this.email !== '' && this.personType !== '') {
        this.$emit('next-step');
      }
    }
  }
};
</script>
