import React, { useCallback, useRef, ChangeEvent } from 'react';
import { Link, useHistory } from 'react-router-dom';

import { FiMail, FiLock, FiUser, FiCamera, FiArrowLeft } from 'react-icons/fi';

import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import { ValidationError } from 'yup';

import api from '../../services/api';

import { useAuth } from '../../context/auth';
import { useToast } from '../../context/toast';

import { updateProfileSchema } from '../../utils/validations/updateProfileValidation';
import getValidationErrors from '../../utils/getValidationErrors';

import { Header, Content, AvatarInput } from './styles';

import Input from '../../components/Input';
import Button from '../../components/Button';

interface ProfileFormData {
  name: string;
  email: string;
  old_password: string;
  password: string;
  password_confirmation: string;
}

const Profile: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const history = useHistory();

  const { user, updateUser } = useAuth();
  const { addToast } = useToast();

  const handleSubmit = useCallback(
    async (data: ProfileFormData) => {
      try {
        formRef.current?.setErrors({});

        await updateProfileSchema.validate(data, {
          abortEarly: false,
        });

        const {
          name,
          email,
          old_password,
          password,
          password_confirmation,
        } = data;

        const requestData = {
          name,
          email,
          ...(old_password && {
            old_password,
            password,
            password_confirmation,
          }),
        };

        const response = await api.put('profile', requestData);

        updateUser(response.data);
        history.push('dashboard');

        addToast({
          type: 'success',
          title: 'Perfil atualizado',
          description: 'Seu perfil alterado com sucesso',
        });
      } catch (error) {
        if (error instanceof ValidationError) {
          const validationErrors = getValidationErrors(error);
          formRef.current?.setErrors(validationErrors);

          return;
        }

        addToast({
          type: 'error',
          title: 'Erro de atualização',
          description:
            'Ocorreu um erro ao atualizar o seu perfil. Por favor, tente novamente',
        });
      }
    },
    [addToast, updateUser, history],
  );

  const handleChangeAvatar = useCallback(
    async (event: ChangeEvent<HTMLInputElement>) => {
      if (event.target.files) {
        const requestData = new FormData();

        requestData.append('avatar', event.target.files[0]);

        try {
          const response = await api.patch('users/avatar', requestData);

          updateUser(response.data);

          addToast({
            type: 'success',
            title: 'Sucesso',
            description: 'Avatar atualizado com sucesso',
          });
        } catch (error) {
          addToast({
            type: 'error',
            title: 'Erro',
            description:
              'Ocorreu um erro ao atualizar o avatar. Por favor, tente novamente',
          });
        }
      }
    },
    [addToast, updateUser],
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
            <label htmlFor="avatar">
              <FiCamera />
              <input type="file" id="avatar" onChange={handleChangeAvatar} />
            </label>
          </AvatarInput>

          <h1>Meu perfil</h1>

          <Input type="text" name="name" placeholder="Nome" icon={FiUser} />
          <Input type="email" name="email" placeholder="E-mail" icon={FiMail} />

          <Input
            containerStyle={{ marginTop: 24 }}
            type="password"
            name="old_password"
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
            type="password"
            name="password_confirmation"
            placeholder="Confirmar nova senha"
            icon={FiLock}
          />

          <Button type="submit">Atualizar perfil</Button>
        </Form>
      </Content>
    </>
  );
};
export default Profile;
