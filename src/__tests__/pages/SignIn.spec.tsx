import React from 'react';
import { render } from '@testing-library/react';
import SignIn from '../../pages/SignIn';

interface LinkProps {
  children: React.ReactNode;
}

jest.mock('react-router-dom', () => {
  return {
    useHistory: jest.fn(),
    Link: ({ children }: LinkProps) => children,
  };
});

describe('SignIn', () => {
  it('should be able to sign in', () => {
    const { debug } = render(<SignIn />);

    debug();
  });
});
