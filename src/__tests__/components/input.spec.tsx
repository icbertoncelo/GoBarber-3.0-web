import React from 'react';

import { render, RenderResult, fireEvent, wait } from '@testing-library/react';
import Input from '../../components/Input';

jest.mock('@unform/core', () => ({
  useField: () => ({
    fieldName: '',
    defaultValue: '',
    error: '',
    registerField: jest.fn(),
  }),
}));

function renderWrapper(): RenderResult {
  return render(<Input name="email" placeholder="E-mail" />);
}

describe('Input Component', () => {
  it('should be able to render the input', () => {
    const { getByPlaceholderText } = renderWrapper();

    const inputElement = getByPlaceholderText('E-mail');

    expect(inputElement).toBeTruthy();
  });

  it('should render highlight on input focus', async () => {
    const { getByPlaceholderText, getByTestId } = renderWrapper();

    const inputElement = getByPlaceholderText('E-mail');
    const inputContainer = getByTestId('input-container');

    fireEvent.focus(inputElement);

    await wait(() => {
      expect(inputContainer).toHaveStyle('color: #ff9000');
      expect(inputContainer).toHaveStyle('border-color: #ff9000');
    });

    fireEvent.blur(inputElement);

    await wait(() => {
      expect(inputContainer).not.toHaveStyle('color: #ff9000');
      expect(inputContainer).not.toHaveStyle('border-color: #ff9000');
    });
  });

  it('should keep the color highlight when input is filled', async () => {
    const { getByPlaceholderText, getByTestId } = renderWrapper();

    const inputElement = getByPlaceholderText('E-mail');
    const inputContainer = getByTestId('input-container');

    fireEvent.change(inputElement, { target: { value: 'jhondoe@test.com' } });

    fireEvent.blur(inputElement);

    await wait(() => {
      expect(inputContainer).toHaveStyle('color: #ff9000');
    });
  });
});
