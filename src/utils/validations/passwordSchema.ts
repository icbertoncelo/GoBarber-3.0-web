import * as Yup from 'yup';

const forgotPasswordSchema = Yup.object().shape({
  email: Yup.string()
    .required('E-mail obrigatório')
    .email('Digite um e-mail válido'),
});

export { forgotPasswordSchema };
