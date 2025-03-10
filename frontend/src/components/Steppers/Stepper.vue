<template>
  <Message :msg="msg" v-show="msg" />
  <div>
    <div class="title-stepper">
      <p>Etapa <span class="current-step">{{ currentStep }}</span> de 4</p>
    </div>
    
    <component :is="currentComponent" 
      v-model:name="name" 
      v-model:razaoSocial="razaoSocial"
      v-model:email="email" 
      v-model:cpf="cpf"
      v-model:cnpj="cnpj"
      v-model:birthday="birthday"
      v-model:foundingDate="foundingDate"
      v-model:phone="phone"
      v-model:personType="personType"
      v-model:password="password" 
      :pessoa="pessoa" 
      @submit="handleSubmit" 
      @update:email="updateEmail"
      @update:personType="updatepersonType"
      @update:cpf="updateCpf"
      @update:cnpj="updateCnpj"
      @update:birthday="updatebirthday"
      @update:foundingDate="updatefoundingDate"
      @update:phone="updatephone"
      @update:password="updatePassword"
    />

    <div class="stepper">
      <button class="button button--outline" @click="prevStep" :disabled="currentStep === 1" v-if="currentStep > 1">Voltar</button>
      <button class="button button--primary" v-if="currentStep < totalSteps" @click="nextStep" :disabled="!isCurrentStepValid">Continuar</button>
      <button class="button button--primary" v-else @click="handleSubmit" :disabled="!isCurrentStepValid">Finalizar Cadastro</button>
    </div>
  </div>
</template>

<script>
import Message from '../Messages/Message.vue';
import FormInicial from '../Forms/FormInicial.vue';
import FormPerson from '../Forms/FormPerson.vue';
import FormPassword from '../Forms/FormPassword.vue';
import FormReview from '../Forms/FormReview.vue';

export default {
  name: "StepperCadastroForm",
  data() {
    return {
      currentStep: 1,
      totalSteps: 4,
      name: '',
      razaoSocial: '',
      email: '',
      emailError: '',
      cpf: '',
      cnpj: '',
      birthday: '',
      foundingDate: '',
      phone: '',
      personType: '',
      password: '',
      passwordError: '',
      pessoa: [],
      msg: null,
      cpfError: '',
      cnpjError: '',
      dateNascimentoError: '',
      dateFundacaoError: '',
      phoneError: ''
    };
  },
  computed: {
    currentComponent() {
      return [FormInicial, FormPerson, FormPassword, FormReview][this.currentStep - 1];
    },
    isCurrentStepValid() {
      if (this.currentStep === 1) {
        return this.emailError === '' && this.email !== '' && this.personType !== '';
      } else if (this.currentStep === 2) {
        if (this.personType === 'Pessoa física') {
          return this.name !== '' && this.cpf !== '' && this.birthday !== '' && this.phone !== '' && !this.cpfError && !this.dateNascimentoError && !this.phoneError;
        } else {
          return this.razaoSocial !== '' && this.cnpj !== '' && this.foundingDate !== '' && this.phone !== '' && !this.cnpjError && !this.dateFundacaoError && !this.phoneError;
        }
      } else if (this.currentStep === 3) {
        return this.passwordError === '' && this.password !== '';
      } else if (this.currentStep === 4) {
        return (
          this.emailError === '' &&
          this.email !== '' &&
          this.personType !== '' &&
          (this.personType === 'Pessoa física' ? this.name !== '' && this.cpf !== '' && this.birthday !== '' : this.razaoSocial !== '' && this.cnpj !== '' && this.foundingDate !== '') &&
          this.phone !== '' &&
          this.password !== '' &&
          !this.cpfError &&
          !this.cnpjError &&
          !this.dateNascimentoError &&
          !this.dateFundacaoError &&
          !this.phoneError &&
          !this.passwordError
        );
      }
      return true;
    }
  },
  methods: {
    nextStep() {
      if (this.isCurrentStepValid && this.currentStep < this.totalSteps) {
        this.currentStep++;
      }
    },
    prevStep() {
      if (this.currentStep > 1) {
        this.currentStep--;
      }
    },
    async handleSubmit() {
      let data;
      if (this.personType === 'Pessoa física') {
        data = {
          name: this.name,
          email: this.email,
          cpf: this.cpf,
          birthday: this.birthday,
          phone: this.phone,
          personType: this.personType,
          password: this.password
        };
      } else {
        data = {
          name: this.razaoSocial, 
          email: this.email,
          cnpj: this.cnpj,
          foundingDate: this.foundingDate,
          phone: this.phone,
          personType: this.personType,
          password: this.password
        };
      }

      const req = await fetch("http://localhost:3002/registration", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const response = await req.json();
      if (req.ok) {
        this.msg = "Cadastro realizado com sucesso!";
        setTimeout(() => (this.msg = ""), 3000);
        this.resetForm();
      } else {
        this.msg = `Erro: ${response.message}`;
        setTimeout(() => (this.msg = ""), 3000);
      }
    },
    resetForm() {
      this.name = "";
      this.razaoSocial = "";
      this.email = "";
      this.emailError = "";
      this.cpf = "";
      this.cnpj = "";
      this.birthday = "";
      this.foundingDate = "";
      this.phone = "";
      this.personType = "";
      this.password = "";
      this.passwordError = "";
      this.currentStep = 1;
    },
    updateEmail(email) {
      this.email = email;
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(email)) {
        this.emailError = 'Por favor, insira um email válido.';
      } else {
        this.emailError = '';
      }
    },
    updatepersonType(tipo) {
      this.personType = tipo;
    },
    updateCpf(cpf) {
      this.cpf = cpf;
      this.validateCpf();
    },
    updateCnpj(cnpj) {
      this.cnpj = cnpj;
      this.validateCnpj();
    },
    updatebirthday(birthday) {
      this.birthday = birthday;
      this.validateBirthdayError();
    },
    updatefoundingDate(foundingDate) {
      this.foundingDate = foundingDate;
      this.validateFoundingDate();
    },
    updatephone(phone) {
      this.phone = phone;
      this.validatephone();
    },
    updatePassword(password) {
      this.password = password;
      this.validatePassword();
    },
    validateCpf() {
      let cpf = this.cpf.replace(/\D/g, ''); 
      if (cpf.length !== 11 || !this.isValidCpf(cpf)) {
        this.cpfError = 'CPF inválido.';
      } else {
        this.cpfError = '';
      }
    },
    isValidCpf(cpf) {
      cpf = cpf.replace(/[^\d]+/g, '');
      if (cpf.length !== 11 || /^(\d)\1+$/.test(cpf)) return false;

      let soma = 0, resto;
      for (let i = 1; i <= 9; i++) soma += parseInt(cpf[i - 1]) * (11 - i);
      resto = (soma * 10) % 11;
      if (resto === 10 || resto === 11) resto = 0;
      if (resto !== parseInt(cpf[9])) return false;

      soma = 0;
      for (let i = 1; i <= 10; i++) soma += parseInt(cpf[i - 1]) * (12 - i);
      resto = (soma * 10) % 11;
      if (resto === 10 || resto === 11) resto = 0;
      if (resto !== parseInt(cpf[10])) return false;

      return true;
    },
    validateCnpj() {
      let cnpj = this.cnpj.replace(/\D/g, ''); 
      if (cnpj.length !== 14 || !this.isValidCnpj(cnpj)) {
        this.cnpjError = 'CNPJ inválido.';
      } else {
        this.cnpjError = '';
      }
    },
    isValidCnpj(cnpj) {
      if (/^(\d)\1+$/.test(cnpj)) return false;

      let tamanho = cnpj.length - 2;
      let numeros = cnpj.substring(0, tamanho);
      let digitos = cnpj.substring(tamanho);
      let soma = 0;
      let pos = tamanho - 7;
      for (let i = tamanho; i >= 1; i--) {
        soma += numeros.charAt(tamanho - i) * pos--;
        if (pos < 2) pos = 9;
      }
      let resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
      if (resultado != digitos.charAt(0)) return false;

      tamanho = tamanho + 1;
      numeros = cnpj.substring(0, tamanho);
      soma = 0;
      pos = tamanho - 7;
      for (let i = tamanho; i >= 1; i--) {
        soma += numeros.charAt(tamanho - i) * pos--;
        if (pos < 2) pos = 9;
      }
      resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
      if (resultado != digitos.charAt(1)) return false;

      return true;
    },
    validateBirthdayError() {
      const today = new Date();
      const birthDate = new Date(this.birthday);
      if (today.getFullYear() - birthDate.getFullYear() < 18) {
        this.dateNascimentoError = 'A data de nascimento precisa ser maior de 18 anos.';
      } else {
        this.dateNascimentoError = '';
      }
    },
    validateFoundingDate() {
      const today = new Date();
      const foundationDate = new Date(this.foundingDate);
      if (foundationDate > today) {
        this.dateFundacaoError = 'A data de fundação não pode ser no futuro.';
      } else {
        this.dateFundacaoError = '';
      }
    },
    validatephone() {
      const phone = this.phone.replace(/\D/g, ''); 
      if (phone.length !== 11) {
        this.phoneError = 'telefone inválido. Deve conter 11 números.';
      } else {
        this.phoneError = '';
      }
    },
    validatePassword() {
      if (this.password.length < 8) {
        this.passwordError = 'A senha deve ter pelo menos 8 caracteres.';
      } else if (!/[A-Z]/.test(this.password)) {
        this.passwordError = 'A senha deve conter pelo menos uma letra maiúscula.';
      } else if (!/[a-z]/.test(this.password)) {
        this.passwordError = 'A senha deve conter pelo menos uma letra minúscula.';
      } else if (!/[0-9]/.test(this.password)) {
        this.passwordError = 'A senha deve conter pelo menos um número.';
      } else if (!/[@#$%^&*(),.?":{}|<>]/.test(this.password)) {
        this.passwordError = 'A senha deve conter pelo menos um caractere especial.';
      } else {
        this.passwordError = '';
      }
    }
  },
  components: { Message, FormInicial, FormPerson, FormPassword, FormReview }
};
</script>