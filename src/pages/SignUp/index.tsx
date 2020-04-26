import React from 'react';
import { FiArrowLeft, FiMail, FiLock, FiUser } from 'react-icons/fi';

import { Container, Content, Form, Background } from './styles';

import logoImg from '../../assets/logo.svg';

import Input from '../../components/Input';
import Button from '../../components/Button';

const SignUp: React.FC = () => (
  <Container>
    <Background />

    <Content>
      <img src={logoImg} alt="GoBarber" />

      <Form>
        <h1>Faça seu cadastro</h1>
        <Input type="text" name="name" placeholder="Nome" icon={FiUser} />
        <Input type="email" name="email" placeholder="E-mail" icon={FiMail} />
        <Input
          type="password"
          name="password"
          placeholder="Senha"
          icon={FiLock}
        />

        <Button type="submit">Cadastrar</Button>
      </Form>

      <a href="account">
        <FiArrowLeft />
        Voltar para logon
      </a>
    </Content>
  </Container>
);
export default SignUp;
