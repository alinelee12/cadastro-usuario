<!-- filepath: c:\Users\AlineAparecidaPereir\Desktop\cadastro-backfront\cadastro-usuario\frontend\src\components\Forms\FormReview.vue -->
<template>
  <form @submit.prevent="handleSubmit">
    <Title text="Revise suas informações" />
    <div class="input-container">
      <label for="email">Endereço de e-mail:</label>
      <input type="email" id="email" :value="email" @input="validateEmail">
      <span v-if="emailError" class="error">{{ emailError }}</span>
    </div>
    <div class="input-container">
      <label :for="personType === 'Pessoa física' ? 'name' : 'razaoSocial'">{{ personType === 'Pessoa física' ? 'Nome' : 'Razão Social' }}:</label>
      <input 
        type="text" 
        :id="personType === 'Pessoa física' ? 'name' : 'razaoSocial'" 
        :value="personType === 'Pessoa física' ? name : razaoSocial" 
        @input="$emit(personType === 'Pessoa física' ? 'update:name' : 'update:razaoSocial', $event.target.value)" 
      >
    </div>
    <div class="input-container" v-if="personType === 'Pessoa física'">
      <label for="cpf">CPF:</label>
      <input type="text" id="cpf" :value="cpf" @input="applyCpfMask" @keypress="limitCpfLength" @blur="validateCpf" >
      <span v-if="cpfError" class="error">{{ cpfError }}</span>
    </div>
    <div class="input-container" v-else>
      <label for="cnpj">CNPJ:</label>
      <input type="text" id="cnpj" :value="cnpj" @input="applyCnpjMask" @keypress="limitCnpjLength" @blur="validateCnpj" >
      <span v-if="cnpjError" class="error">{{ cnpjError }}</span>
    </div>
    <div class="input-container">
      <label :for="personType === 'Pessoa física' ? 'birthday' : 'foundingDate'">{{ personType === 'Pessoa física' ? 'Data de Nascimento' : 'Data de Fundação' }}:</label>
      <input 
        type="date" 
        :id="personType === 'Pessoa física' ? 'birthday' : 'foundingDate'" 
        :value="formatDateForInput(personType === 'Pessoa física' ? birthday : foundingDate)" 
        @input="validateDate"
      >
      <span v-if="dateError" class="error">{{ dateError }}</span>
    </div>
    <div class="input-container">
      <label for="phone">Telefone:</label>
      <input type="tel" id="phone" :value="phone" @input="applyphoneMask" @keypress="limitphoneLength" @blur="validatephone">
      <span v-if="phoneError" class="error">{{ phoneError }}</span>
    </div>
    <div class="input-container">
      <label for="password">Senha:</label>
      <div class="password-container">
        <input 
          :type="passwordFieldType" 
          id="password" 
          :value="password" 
          @input="validatePassword"
          @keypress="limitPasswordLength"
          required
        />
        <button type="button" @click="togglePasswordVisibility" class="toggle-password">
          <span v-if="showPassword"><font-awesome-icon :icon="['fas', 'eye-slash']" class="eye-icon" /></span>
          <span v-else><font-awesome-icon :icon="['fas', 'eye']" class="eye-icon" /></span>
        </button>
      </div>
      <span v-if="passwordError" class="error">{{ passwordError }}</span>
    </div>
  </form>
</template>

<script>
import Title from '../Titles/StepperTitles.vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import {
  validateCpf,
  validateCnpj,
  validatephone,
  validateBirthdayError,
  validateFoundingDate,
  validateEmail,
  validatePassword
} from '../../utils/validators';

library.add(faEye, faEyeSlash);

export default {
  name: 'FormReview',
  components: {
    Title,
    FontAwesomeIcon
  },
  props: ['name', 'razaoSocial', 'cpf', 'cnpj', 'birthday', 'foundingDate', 'phone', 'personType', 'password', 'email'],
  data() {
    return {
      showPassword: false,
      nameError: '',
      razaoSocialError: '',
      cpfError: '',
      cnpjError: '',
      dateError: '',
      phoneError: '',
      emailError: '',
      passwordError: ''
    };
  },
  computed: {
    isFormValid() {
      return (
        this.nameError === '' &&
        this.razaoSocialError === '' &&
        this.cpfError === '' &&
        this.cnpjError === '' &&
        this.dateError === '' &&
        this.phoneError === '' &&
        this.emailError === '' &&
        this.passwordError === '' &&
        this.name !== '' &&
        this.razaoSocial !== '' &&
        this.cpf !== '' &&
        this.cnpj !== '' &&
        this.birthday !== '' &&
        this.foundingDate !== '' &&
        this.phone !== '' &&
        this.email !== '' &&
        this.password !== ''
      );
    },
    isPasswordValid() {
      return this.passwordError === '' && this.password !== '';
    },
    passwordFieldType() {
      return this.showPassword ? 'text' : 'password';
    },
    passwordToggleIcon() {
      return this.showPassword ? 'fas fa-eye-slash' : 'fas fa-eye';
    }
  },
  methods: {
    validatename(event) {
      const name = event.target.value;
      this.$emit('update:name', name);
      this.nameError = name.trim() === '' ? 'Nome é obrigatório.' : '';
    },
    validateRazaoSocial(event) {
      const razaoSocial = event.target.value;
      this.$emit('update:razaoSocial', razaoSocial);
      this.razaoSocialError = razaoSocial.trim() === '' ? 'Razão Social é obrigatória.' : '';
    },
    validateCpf(event) {
      const cpf = event.target.value;
      this.$emit('update:cpf', cpf);
      this.cpfError = validateCpf(cpf);
    },
    validateCnpj(event) {
      const cnpj = event.target.value;
      this.$emit('update:cnpj', cnpj);
      this.cnpjError = validateCnpj(cnpj);
    },
    validateDate(event) {
      const date = event.target.value;
      const formattedDate = this.formatDate(date);
      if (this.personType === 'Pessoa física') {
        this.$emit('update:birthday', formattedDate);
        this.dateError = validateBirthdayError(formattedDate);
      } else {
        this.$emit('update:foundingDate', formattedDate);
        this.dateError = validateFoundingDate(formattedDate);
      }
    },
    formatDate(date) {
      const [year, month, day] = date.split('-');
      return `${day}/${month}/${year}`;
    },
    formatDateForInput(date) {
      const [day, month, year] = date.split('/');
      return `${year}-${month}-${day}`;
    },
    validatephone(event) {
      const phone = event.target.value;
      this.$emit('update:phone', phone);
      this.phoneError = validatephone(phone);
    },
    validateEmail(event) {
      const email = event.target.value;
      this.$emit('update:email', email);
      this.emailError = validateEmail(email);
    },
    validatePassword(event) {
      const password = event.target.value;
      this.$emit('update:password', password);
      this.passwordError = validatePassword(password);
    },
    applyCpfMask(event) {
      let cpf = event.target.value.replace(/\D/g, ''); 
      if (cpf.length > 11) {
        cpf = cpf.slice(0, 11);
      }
      cpf = cpf.replace(/(\d{3})(\d)/, '$1.$2');
      cpf = cpf.replace(/(\d{3})(\d)/, '$1.$2');
      cpf = cpf.replace(/(\d{3})(\d{1,2})$/, '$1-$2');
      this.$emit('update:cpf', cpf);
    },
    limitCpfLength(event) {
      const cpf = event.target.value.replace(/\D/g, '');
      if (cpf.length >= 11 && event.keyCode !== 8 && event.keyCode !== 46) {
        event.preventDefault();
      }
    },
    applyCnpjMask(event) {
      let cnpj = event.target.value.replace(/\D/g, ''); 
      if (cnpj.length > 14) {
        cnpj = cnpj.slice(0, 14);
      }
      cnpj = cnpj.replace(/^(\d{2})(\d)/, '$1.$2');
      cnpj = cnpj.replace(/^(\d{2})\.(\d{3})(\d)/, '$1.$2.$3');
      cnpj = cnpj.replace(/\.(\d{3})(\d)/, '.$1/$2');
      cnpj = cnpj.replace(/(\d{4})(\d)/, '$1-$2');
      this.$emit('update:cnpj', cnpj);
    },
    limitCnpjLength(event) {
      const cnpj = event.target.value.replace(/\D/g, '');
      if (cnpj.length >= 14 && event.keyCode !== 8 && event.keyCode !== 46) {
        event.preventDefault();
      }
    },
    applyphoneMask(event) {
      let phone = event.target.value.replace(/\D/g, '');
      if (phone.length > 11) {
        phone = phone.slice(0, 11);
      }
      phone = phone.replace(/^(\d{2})(\d)/g, '($1) $2');
      phone = phone.replace(/(\d{5})(\d{4})$/, '$1-$2');
      this.$emit('update:phone', phone);
    },
    limitphoneLength(event) {
      const phone = event.target.value.replace(/\D/g, '');
      if (phone.length >= 11 && event.keyCode !== 8 && event.keyCode !== 46) {
        event.preventDefault();
      }
    },
    limitPasswordLength(event) {
      const password = event.target.value;
      if (password.length >= 8 && event.keyCode !== 8 && event.keyCode !== 46) {
        event.preventDefault();
      }
    },
    togglePasswordVisibility() {
      this.showPassword = !this.showPassword;
    },
    handleSubmit() {
      this.validateCpf();
      this.validateCnpj();
      this.validateDate({ target: { value: this.personType === 'Pessoa física' ? this.birthday : this.foundingDate } });
      this.validatephone({ target: { value: this.phone } });
      this.validateEmail({ target: { value: this.email } });
      if (this.isFormValid) {
        this.$emit('next-step');
      }
    }
  }
};
</script>