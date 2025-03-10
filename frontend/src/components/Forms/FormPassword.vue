<template>
  <form @submit.prevent="handleSubmit">
    <Title text="Senha de acesso" />
    <div class="input-container">
      <label for="password">Digite a sua senha:</label>
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
      <div class="password-requirements">
        <p class="password-requirements__title">Sua senha deve conter:</p>
        <ul>
          <li >Pelo menos 8 caracteres</li>
          <li >Uma letra maiúscula</li>
          <li >Uma letra minúscula</li>
          <li >Um número</li>
          <li >Um caractere especial (@, #, $, %, etc.)</li>
        </ul>
      </div>
    </div>
  </form>
</template>

<script>
import Title from '../Titles/StepperTitles.vue';
import { validatePassword } from '../../utils/validators'; 
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

export default {
  name: 'FormPassword',
  components: {
    Title,
    FontAwesomeIcon
  },
  props: ['password'],
  data() {
    return {
      passwordError: '',
      showPassword: false
    };
  },
  computed: {
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
    validatePassword(event) {
      const password = event.target.value;
      this.$emit('update:password', password);
      this.passwordError = validatePassword(password);
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
      if (this.isPasswordValid) {
        this.$emit('next-step');
      }
    }
  }
};
</script>


