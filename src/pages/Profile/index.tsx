import React, { useCallback, useRef } from 'react';
import { Link } from 'react-router-dom';

import { FiMail, FiLock, FiUser, FiCamera, FiArrowLeft } from 'react-icons/fi';

import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import { ValidationError } from 'yup';

import { useAuth } from '../../context/auth';
import { useToast } from '../../context/toast';

import { signUpSchema } from '../../utils/validations/signSchema';
import getValidationErrors from '../../utils/getValidationErrors';

import { Header, Content, AvatarInput } from './styles';

import Input from '../../components/Input';
import Button from '../../components/Button';

interface ProfileFormData {
  name: string;
  email: string;
  password: string;
}

const Profile: React.FC = () => {
  const formRef = useRef<FormHandles>(null);

  const { signUp, user } = useAuth();
  const { addToast } = useToast();

  const handleSubmit = useCallback(
    async (data: ProfileFormData) => {
      try {
        formRef.current?.setErrors({});

        await signUpSchema.validate(data, {
          abortEarly: false,
        });

        await signUp({
          name: data.name,
          email: data.email,
          password: data.password,
        });

        addToast({
          type: 'success',
          title: 'Sucesso',
          description: 'Cadastro realizado com sucesso',
        });
      } catch (error) {
        if (error instanceof ValidationError) {
          const validationErrors = getValidationErrors(error);
          formRef.current?.setErrors(validationErrors);

          return;
        }

        addToast({
          type: 'error',
          title: 'Erro de cadastro',
          description:
            'Ocorreu um erro ao fazer o cadastro. Por favor, tente novamente',
        });
      }
    },
    [signUp, addToast],
  );

  return (
    <>
      <Header>
        <div>
          <Link to="dashboard">
            <FiArrowLeft />
          </Link>
        </div>
      </Header>

      <Content>
        <Form
          ref={formRef}
          initialData={{
            name: user.name,
            email: user.email,
          }}
          onSubmit={handleSubmit}
        >
          <AvatarInput>
            <img src={user.avatar_url} alt={user.name} />
            <button type="button">
              <FiCamera />
            </button>
          </AvatarInput>

          <h1>Meu perfil</h1>

          <Input type="text" name="name" placeholder="Nome" icon={FiUser} />
          <Input type="email" name="email" placeholder="E-mail" icon={FiMail} />

          <Input
            containerStyle={{ marginTop: 24 }}
            type="old_password"
            name="password"
            placeholder="Senha atual"
            icon={FiLock}
          />
          <Input
            type="password"
            name="password"
            placeholder="Nova senha"
            icon={FiLock}
          />
          <Input
            type="password_confirmation"
            name="password"
            placeholder="Confirmar nova senha"
            icon={FiLock}
          />

          <Button type="submit">Cadastrar</Button>
        </Form>
      </Content>
    </>
  );
};
export default Profile;
