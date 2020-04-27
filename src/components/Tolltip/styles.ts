import styled from 'styled-components';

import devices from '../../utils/devices';

export const Container = styled.div`
  position: relative;

  &:hover span {
    opacity: 1;
    visibility: visible;
  }

  span {
    background: #ff9000;
    width: 180px;
    padding: 8px;
    border-radius: 4px;
    font-size: 1.4rem;
    font-weight: 500;
    color: #312e38;
    opacity: 0;
    transition: opacity 0.6s;
    visibility: hidden;

    position: absolute;
    bottom: calc(100% + 12px);
    left: 50%;
    transform: translateX(-50%);

    &::before {
      position: absolute;
      content: '';
      border-style: solid;
      border-color: #ff9000 transparent;
      border-width: 6px 6px 0 6px;
      top: 100%;
      left: 50%;
      transform: translateX(-50%);
    }
  }
  @media ${devices.mobile} {
    span {
      border-radius: 4px 4px 0 4px;

      left: 100%;
      transform: translateX(-100%);

      &::before {
        left: 100%;
        transform: translateX(-100%);
      }
    }
  }
`;
