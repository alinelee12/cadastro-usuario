const validations = require('../utils/validations');

const Registration = {
    create: (name, email, personType, cpf, birthday, cnpj, foundingDate, phone, password) => {
        return {
            name,
            email,
            personType,
            cpf,
            birthday,
            cnpj,
            foundingDate,
            phone,
            password,
        };
    },
    validate: (registration) => {
    const errors = [];

    const nameError = validations.validateName(registration.name);
    if (nameError) errors.push(nameError);

    const emailError = validations.validateEmail(registration.email);
    if (emailError) errors.push(emailError);

    const personType = registration.personType;
    if (validations.validatePersonType(personType)) {
        errors.push('Tipo de pessoa inválido');
    } else if (personType == 'Pessoa física') {
        const cpfError = validations.validateCpf(registration.cpf);
        if (cpfError) errors.push(cpfError);

        const birthdayError = validations.validateBirthdayError(registration.birthday);
        if (birthdayError) errors.push(birthdayError);
    } else {
        const cnpjError = validations.validateCnpj(registration.cnpj);
        if (cnpjError) errors.push(cnpjError);

        const foundingDateError = validations.validateFoundingDate(registration.foundingDate);
        if (foundingDateError) errors.push(foundingDateError);
    }

    const phoneError = validations.validatePhone(registration.phone);
    if (phoneError) errors.push(phoneError);

    const passwordError = validations.validatePassword(registration.password);
    if (passwordError) errors.push(passwordError);

    return errors.length > 0 ? errors : null;
    },
};

module.exports = Registration;