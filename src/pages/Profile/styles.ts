import styled from 'styled-components';
import { shade } from 'polished';

import devices from '../../utils/devices';

export const Header = styled.header`
  height: 144px;
  background: #28262e;

  display: flex;
  align-items: center;

  div {
    width: 100%;
    max-width: 1120px;
    margin: 0 auto;

    svg {
      width: 24px;
      height: 24px;
      color: #999591;
      transition: color 0.2s;

      &:hover {
        color: ${shade(0.2, '#999591')};
      }
    }
  }

  @media ${devices.mobile} {
    div {
      padding: 0 16px;
    }
  }
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: -83px auto 0;

  width: 100%;

  form {
    width: 340px;
    text-align: center;
    display: flex;
    flex-direction: column;

    h1 {
      margin-bottom: 24px;
      font-size: 20px;
      text-align: left;
    }

    a {
      color: #f4ede8;
      display: block;
      margin-top: 24px;
      text-decoration: none;
      transition: color 0.2s;

      &:hover {
        color: ${shade(0.2, '#f4ede8')};
      }
    }
  }
`;

export const AvatarInput = styled.div`
  margin-bottom: 36px;
  position: relative;
  align-self: center;

  img {
    height: 186px;
    width: 186px;
    border-radius: 50%;
  }

  label {
    position: absolute;
    height: 48px;
    width: 48px;
    border-radius: 50%;
    border: 0;
    background: #ff9000;
    right: 0;
    bottom: 0;
    transition: background-color 0.2s;
    cursor: pointer;

    display: flex;
    align-items: center;
    justify-content: center;

    svg {
      width: 20px;
      height: 20px;
      color: #312e38;
    }

    input {
      display: none;
    }

    &:hover {
      background: ${shade(0.2, '#ff9000')};
    }
  }
`;
