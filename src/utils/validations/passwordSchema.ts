import * as Yup from 'yup';

const forgotPasswordSchema = Yup.object().shape({
  email: Yup.string()
    .required('E-mail obrigatório')
    .email('Digite um e-mail válido'),
});

const resetPasswordSchema = Yup.object().shape({
  password: Yup.string().required('Senha obrigatória'),
  password_confirmation: Yup.string().oneOf(
    [Yup.ref('password'), null],
    'Confirmação de senha incorreta',
  ),
});

export { forgotPasswordSchema, resetPasswordSchema };
