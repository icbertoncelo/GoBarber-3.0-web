import React from 'react';

import { ToastMessage } from '../../context/toast';

import { Container } from './styles';

import Toast from './Toast';

interface ToastMessageProps {
  messages: ToastMessage[];
}

const ToastContainer: React.FC<ToastMessageProps> = ({ messages }) => {
  return (
    <Container>
      {messages.map(message => (
        <Toast key={message.id} message={message} />
      ))}
    </Container>
  );
};

export default ToastContainer;
