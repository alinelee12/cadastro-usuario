// Validação do Nome
export function validateName(name) {
  const nameRegex = /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/;
  if (!name || !nameRegex.test(name)) {
    return 'Nome inválido.';
  }
  return '';
}

// Validação de CPF
export function validateCpf(cpf) {
  cpf = cpf.replace(/\D/g, ''); 
  if (cpf.length !== 11 || !isValidCpf(cpf)) {
    return 'CPF inválido.';
  }
  return '';
}

function isValidCpf(cpf) {
  if (/^(\d)\1+$/.test(cpf)) return false;

  let soma = 0;
  let resto;
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
}

// Validação de CNPJ
export function validateCnpj(cnpj) {
  cnpj = cnpj.replace(/\D/g, ''); 
  if (cnpj.length !== 14 || !isValidCnpj(cnpj)) {
    return 'CNPJ inválido.';
  }
  return '';
}

function isValidCnpj(cnpj) {
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
}

// Validação de phone
export function validatephone(phone) {
  phone = phone.replace(/\D/g, ''); 
  if (phone.length !== 11) {
    return 'telefone inválido. Deve conter 11 números.';
  }
  return '';
}

// Validação de Data de Nascimento
export function validateBirthdayError(date) {
  if (!date || typeof date !== 'string') {
    return 'Data de nascimento inválida';
  }

  const regex = /^(\d{2})\/(\d{2})\/(\d{4})$/;
  const match = date.match(regex);
  if (!match) {
      return 'Formato de data inválido. Use dd/mm/yyyy.';
  }

  const day = parseInt(match[1], 10);
  const month = parseInt(match[2], 10) - 1;
  const year = parseInt(match[3], 10);
  const birthDate = new Date(year, month, day);
  if (isNaN(birthDate.getTime()) || birthDate.getDate() !== day) {
      return 'Data de nascimento inválida.';
  }

  const today = new Date();
  const ageDiff = today - birthDate;
  const ageDate = new Date(ageDiff);
  const age = Math.abs(ageDate.getUTCFullYear() - 1970);
  const birthAnniversaryThisYear = new Date(today.getFullYear(), month, day);
  if (age < 12 || (age === 12 && today < birthAnniversaryThisYear)) {
      return 'Necessário ter no mínimo 12 (doze) anos.';
  }
  return '';
}

// Validação de Data de Fundação
export function validateFoundingDate(date) {
  if (!date || typeof date !== 'string') {
    return 'Data de fundação inválida';
  }

  const regex = /^(\d{2})\/(\d{2})\/(\d{4})$/;
  const match = date.match(regex);
  if (!match) {
    return 'Formato de data inválido. Use dd/mm/yyyy.';
  }

  const day = parseInt(match[1], 10);
  const month = parseInt(match[2], 10) - 1;
  const year = parseInt(match[3], 10);
  const foundationDate = new Date(year, month, day);
  if (isNaN(foundationDate.getTime()) || foundationDate.getDate() !== day) {
    return 'Data de fundação inválida.';
  }

  const today = new Date();
  today.setHours(0, 0, 0, 0); 
  const minDate = new Date(today);
  minDate.setDate(today.getDate() - 7); 

  if (foundationDate > today) {
    return 'A data de fundação não pode ser no futuro.';
  }

  if (foundationDate > minDate) {
    return 'A empresa precisa ter pelo menos 7 dias de abertura para fazer o cadastro.';
  }

  return '';
}

// Validação de Email
export function validateEmail(email) {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(email)) {
    return 'Por favor, insira um email válido.';
  }
  return '';
}

// Validação de Senha
export function validatePassword(password) {
  if (password.length < 8) {
    return 'A senha deve ter pelo menos 8 caracteres.';
  }
  if (!/[A-Z]/.test(password)) {
    return 'A senha deve conter pelo menos uma letra maiúscula.';
  }
  if (!/[a-z]/.test(password)) {
    return 'A senha deve conter pelo menos uma letra minúscula.';
  }
  if (!/[0-9]/.test(password)) {
    return 'A senha deve conter pelo menos um número.';
  }
  if (!/[@#$%^&*(),.?":{}|<>]/.test(password)) {
    return 'A senha deve conter pelo menos um caractere especial.';
  }
  return '';
}