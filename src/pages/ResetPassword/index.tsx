import React, { useCallback, useRef, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { FiLock } from 'react-icons/fi';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import { ValidationError } from 'yup';

import { useToast } from '../../contexts/toast';
import api from '../../services/api';

import { resetPasswordSchema } from '../../utils/validations/passwordSchema';
import getValidationErrors from '../../utils/getValidationErrors';

import { Container, Content, AnimationContainer, Background } from './styles';

import logoImg from '../../assets/logo.svg';

import Input from '../../components/Input';
import Button from '../../components/Button';

interface ResetPasswordFormData {
  password: string;
  password_confirmation: string;
}

const ResetPassword: React.FC = () => {
  const history = useHistory();
  const { search } = useLocation();
  const queryParams = new URLSearchParams(search);

  const formRef = useRef<FormHandles>(null);
  const [loading, setLoading] = useState(false);

  const { addToast } = useToast();

  const handleSubmit = useCallback(
    async (data: ResetPasswordFormData) => {
      try {
        setLoading(true);
        formRef.current?.setErrors({});

        await resetPasswordSchema.validate(data, {
          abortEarly: false,
        });

        const { password, password_confirmation } = data;
        const token = queryParams.get('token');

        await api.post('password/reset', {
          password,
          password_confirmation,
          token,
        });

        addToast({
          type: 'success',
          title: 'Sucesso',
          description: 'Senha alterada com sucesso',
        });

        history.push('/');
      } catch (error) {
        if (error instanceof ValidationError) {
          const validationErrors = getValidationErrors(error);
          formRef.current?.setErrors(validationErrors);

          return;
        }

        addToast({
          type: 'error',
          title: 'Erro ao resetar a senha',
          description:
            'Ocorreu um erro ao resetar sua senha. Por favor, tente novamente!',
        });
      } finally {
        setLoading(false);
      }
    },
    [queryParams, history, addToast],
  );

  return (
    <Container>
      <Content>
        <AnimationContainer>
          <img src={logoImg} alt="GoBarber" />

          <Form ref={formRef} onSubmit={handleSubmit}>
            <h1>Reset de senha</h1>
            <Input
              type="password"
              name="password"
              placeholder="Nova senha"
              icon={FiLock}
            />
            <Input
              type="password"
              name="password_confirmation"
              placeholder="Confirmação da nova senha"
              icon={FiLock}
            />

            <Button loading={loading} type="submit">
              Alterar senha
            </Button>
          </Form>
        </AnimationContainer>
      </Content>

      <Background />
    </Container>
  );
};
export default ResetPassword;
