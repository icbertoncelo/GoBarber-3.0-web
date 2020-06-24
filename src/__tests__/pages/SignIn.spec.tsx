import React from 'react';
import { render, fireEvent, wait } from '@testing-library/react';
import SignIn from '../../pages/SignIn';

interface LinkProps {
  children: React.ReactNode;
}

const mockedAddToast = jest.fn();
const mockedSignIn = jest.fn();

jest.mock('react-router-dom', () => ({
  Link: ({ children }: LinkProps) => children,
}));

jest.mock('../../contexts/auth', () => ({
  useAuth: () => ({
    signIn: mockedSignIn,
  }),
}));

jest.mock('../../contexts/toast', () => ({
  useToast: () => ({
    addToast: mockedAddToast,
  }),
}));

describe('SignIn', () => {
  beforeEach(() => {
    mockedAddToast.mockClear();
  });

  it('should be able to sign in', async () => {
    const { getByPlaceholderText, getByText } = render(<SignIn />);

    const emailField = getByPlaceholderText('E-mail');
    const passwordField = getByPlaceholderText('Senha');
    const submitButton = getByText('Entrar');

    fireEvent.change(emailField, { target: { value: 'user@test.com' } });
    fireEvent.change(passwordField, { target: { value: '123456' } });
    fireEvent.click(submitButton);

    await wait(() =>
      expect(mockedAddToast).toHaveBeenCalledWith(
        expect.objectContaining({
          type: 'success',
        }),
      ),
    );
  });

  it('should not be able to sign in using invalid credentials', async () => {
    const { getByPlaceholderText, getByText } = render(<SignIn />);

    const emailField = getByPlaceholderText('E-mail');
    const passwordField = getByPlaceholderText('Senha');
    const submitButton = getByText('Entrar');

    fireEvent.change(emailField, { target: { value: 'invalid-email' } });
    fireEvent.change(passwordField, { target: { value: '123456' } });
    fireEvent.click(submitButton);

    await wait(() => expect(mockedAddToast).not.toHaveBeenCalled());
  });

  it('should display an error when login fails', async () => {
    mockedSignIn.mockImplementation(() => {
      throw new Error();
    });

    const { getByPlaceholderText, getByText } = render(<SignIn />);

    const emailField = getByPlaceholderText('E-mail');
    const passwordField = getByPlaceholderText('Senha');
    const submitButton = getByText('Entrar');

    fireEvent.change(emailField, { target: { value: 'user@test.com' } });
    fireEvent.change(passwordField, { target: { value: '123456' } });
    fireEvent.click(submitButton);

    await wait(() =>
      expect(mockedAddToast).toHaveBeenCalledWith(
        expect.objectContaining({
          type: 'error',
        }),
      ),
    );
  });
});
