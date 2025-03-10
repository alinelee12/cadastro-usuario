const validations = {
    isValidCpf: (cpf) => {
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
    },
    isValidCnpj: (cnpj) => {
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
    validateName: (name) => {
        const nameRegex = /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/;
        if (!name || !nameRegex.test(name)) {
            return 'name inválido';
        }
        return null;
    },
    validateEmail: (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email || !emailRegex.test(email)) {
            return 'Email inválido';
        }
        return null;
    },
    validatePersonType: (personType) => {
        if (personType != 'Pessoa física' && personType != 'Pessoa jurídica') {
            return 'Tipo de pessoa inválido';
        }
        return false;
    },
    validateCpf: function (cpf) {
        const cpfSemMascara = cpf ? cpf.replace(/\D/g, '') : '';
        if (!cpfSemMascara || cpfSemMascara.length !== 11 || !validations.isValidCpf(cpfSemMascara)) {
            return 'CPF inválido';
        }
    
        return null;
    },
    validateBirthdayError: (date) => {
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
    
        return null;
    },
    validateCnpj: (cnpj) => {
        const cpfSemMascara = cnpj ? cnpj.replace(/\D/g, '') : '';
        if (!cnpj || cpfSemMascara.length !== 14 || !validations.isValidCnpj(cpfSemMascara)) {
            return 'CNPJ inválido';
        }
        return null;
    },
    validateFoundingDate: (date) => {
        console.log(date);
        if (!date || new Date(date) > new Date()) {
            return 'Data de fundação inválida';
        }
        return null;
    },
    validatePhone: (phone) => {
        phone.replace(/\D/g, '');
        if (!phone || phone.length < 10) {
            return 'telefone inválido';
        }
        return null;
    },
    validatePassword: (password) => {
        if (!password || password.length < 6) {
            return 'Senha inválida';
        }
        return null;
    }
};

module.exports = validations;