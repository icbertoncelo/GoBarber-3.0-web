import React, { useEffect } from 'react';
import {
  FiXCircle,
  FiAlertCircle,
  FiInfo,
  FiCheckCircle,
} from 'react-icons/fi';

import { ToastMessage, useToast } from '../../../context/toast';

import { Container } from './styles';

interface ToastProps {
  message: ToastMessage;
}

const icons = {
  info: <FiInfo size={24} />,
  success: <FiCheckCircle size={24} />,
  error: <FiAlertCircle size={24} />,
};

const Toast: React.FC<ToastProps> = ({ message }) => {
  const { removeToast } = useToast();

  useEffect(() => {
    const timer = setTimeout(() => {
      removeToast(message.id);
    }, 3000);

    return () => {
      clearTimeout(timer);
    };
  }, [removeToast, message.id]);

  return (
    <Container type={message.type}>
      {icons[message.type || 'info']}

      <div>
        <strong>{message.title}</strong>
        <p>{message.description}</p>
      </div>

      <button type="button" onClick={() => removeToast(message.id)}>
        <FiXCircle size={20} />
      </button>
    </Container>
  );
};

export default Toast;
