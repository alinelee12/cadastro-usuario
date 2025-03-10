<!-- filepath: c:\Users\AlineAparecidaPereir\Desktop\cadastro-backfront\cadastro-usuario\frontend\src\components\Forms\FormPerson.vue -->
<template>
  <form @submit.prevent="handleSubmit">
    <Title :text="personType === 'Pessoa física' ? 'Pessoa Física' : 'Pessoa Jurídica'" />
    <div class="input-container">
      <label :for="personType === 'Pessoa física' ? 'name' : 'razaoSocial'">{{ personType === 'Pessoa física' ? 'Nome' : 'Razão Social' }}:</label>
      <input 
        type="text" 
        :id="personType === 'Pessoa física' ? 'name' : 'razaoSocial'" 
        :value="personType === 'Pessoa física' ? name : razaoSocial" 
        @input="validateName"
      >
      <span v-if="nameError" class="error">{{ nameError }}</span>
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
        @input="updateDate"
      >
      <span v-if="dateError" class="error">{{ dateError }}</span>
    </div>
    <div class="input-container">
      <label for="phone">Telefone:</label>
      <input type="tel" id="phone" :value="phone" @input="applyphoneMask" @keypress="limitphoneLength" @blur="validatephone">
      <span v-if="phoneError" class="error">{{ phoneError }}</span>
    </div>
  </form>
</template>

<script>
import Title from '../Titles/StepperTitles.vue';
import {
  validateName,
  validateCpf,
  validateCnpj,
  validatephone,
  validateBirthdayError,
  validateFoundingDate
} from '../../utils/validators'; 

export default {
  name: 'FormPerson',
  components: {
    Title
  },
  props: ['name', 'razaoSocial', 'cpf', 'cnpj', 'birthday', 'foundingDate', 'phone', 'personType'],
  data() {
    return {
      nameError: '',
      cpfError: '',
      cnpjError: '',
      dateError: '',
      phoneError: ''
    };
  },
  computed: {
    isFormValid() {
      if (this.personType === 'Pessoa física') {
        return (
          this.name.trim() !== '' &&
          this.cpf !== '' &&
          this.birthday !== '' &&
          this.phone !== '' &&
          !this.nameError &&
          !this.cpfError &&
          !this.dateError &&
          !this.phoneError
        );
      } else {
        return (
          this.razaoSocial.trim() !== '' &&
          this.cnpj !== '' &&
          this.foundingDate !== '' &&
          this.phone !== '' &&
          !this.nameError &&
          !this.cnpjError &&
          !this.dateError &&
          !this.phoneError
        );
      }
    }
  },
  methods: {
    validateName(event) {
      const value = event.target.value;
      if (this.personType === 'Pessoa física') {
        this.$emit('update:name', value);
        this.nameError = validateName(value);
      } else {
        this.$emit('update:razaoSocial', value);
        this.nameError = validateName(value);
      }
    },
    validateCpf() {
      this.cpfError = validateCpf(this.cpf);
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
    validateCnpj() {
      this.cnpjError = validateCnpj(this.cnpj);
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
    updateDate(event) {
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
    validatephone(event) {
      const phone = event.target.value;
      this.$emit('update:phone', phone);
      this.phoneError = validatephone(phone);
    },
    handleSubmit() {
      this.validateName({ target: { value: this.personType === 'Pessoa física' ? this.name : this.razaoSocial } });
      this.validateCpf();
      this.validateCnpj();
      this.updateDate({ target: { value: this.personType === 'Pessoa física' ? this.birthday : this.foundingDate } });
      this.validatephone({ target: { value: this.phone } });
      if (this.isFormValid) {
        this.$emit('next-step');
      }
    }
  }
};
</script>
