import styled from 'styled-components';

import devices from '../../utils/devices';

export const Container = styled.div`
  position: absolute;
  right: 0;
  top: 0;
  padding: 30px;
  overflow: hidden;

  @media ${devices.mobile} {
    width: 100vw;
  }
`;
