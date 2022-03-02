import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';
import {Form} from "./Components/Form/Form";
import userEvent from "@testing-library/user-event";

// test('renders learn react link', () => {
//   render(<App />);
//   const linkElement = screen.getByText(/learn react/i);
//   expect(linkElement).toBeInTheDocument();
// });

describe("<Form />", () => {
  test('display check on email field', () => {
    render(<Form />);
    const input = screen.getByLabelText("Email");
    expect(input).toBeInTheDocument();

  })
  test('validation check on email field', () => {
    render(<Form />);

    const input = screen.getByLabelText("Email");
    userEvent.type(input, "test@mail.com");
    expect(input).toHaveValue("test@mail.com");
  });
  test('pass invalid email', () => {
    render(<Form />);

    const input = screen.getByLabelText("Email");
    userEvent.type(input, "test@mailcom");
    expect(input).toHaveValue("test@mail.com");
  });
  test('pass invalid email', () => {
    const res = render(<Form />);

    const input = screen.getByLabelText("Email");
    userEvent.type(input, "test-mail.com");
    expect(input).toHaveValue("test-mail.com");
    expect(res.container.querySelector('#email-helper-text')).toBeInTheDocument();
  });
  test('pass invalid model', () => {
    render(<Form />);

    const input = screen.getByLabelText("Модель");
    userEvent.type(input, "A7");
    expect(input).toHaveValue("A7");
    expect(screen.getByText("Только латинские буквы и цифры от 4х до 20 символов")).toBeInTheDocument();
  });
  test('pass valid model', () => {
    const res = render(<Form />);

    const input = screen.getByLabelText("model-input");
    userEvent.type(input, "qashqai");
    expect(input).toHaveValue("qashqai");
    expect(res.container.querySelector('#model-helper-text')).not.toBeInTheDocument();;
  });
})