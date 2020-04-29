import styled, { css } from 'styled-components';
import { animated } from 'react-spring';

import devices from '../../../utils/devices';

interface ToastProps {
  type?: 'info' | 'success' | 'error';
}

const toastTypeVariations = {
  info: css`
    background: #ffffff;
    color: #3172b7;
  `,
  success: css`
    background: #e6fffa;
    color: #2e656a;
  `,
  error: css`
    background: #fddede;
    color: #c53030;
  `,
};

export const Container = styled(animated.div)<ToastProps>`
  display: flex;
  width: 360px;

  position: relative;
  padding: 16px;
  border-radius: 10px;
  box-shadow: 2px 2px 8px rgba(0, 0, 0, 0.2);

  & + div {
    margin-top: 8px;
  }

  ${props => toastTypeVariations[props.type || 'info']}

  > svg {
    margin-right: 12px;
  }

  div {
    flex: 1;

    p {
      margin-top: 4px;
      font-size: 1.4rem;
      opacity: 0.8;
      line-height: 20px;
    }
  }

  button {
    border: 0;
    background: transparent;
    color: inherit;
    align-self: flex-start;
  }

  @media ${devices.mobile} {
    width: 100%;
  }
`;
