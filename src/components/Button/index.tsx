import React, { ButtonHTMLAttributes } from 'react';
import { PulseLoader } from 'react-spinners';

import { Container } from './styles';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  loading?: boolean;
};

const Button: React.FC<ButtonProps> = ({ loading, children, ...rest }) => (
  <Container type="button" {...rest}>
    {loading ? (
      <PulseLoader size={10} color="#312e38" loading={loading} />
    ) : (
      children
    )}
  </Container>
);

export default Button;
