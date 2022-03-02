import React from 'react';
import {getByLabelText, render as rtlRender, screen} from '@testing-library/react';
import App from './App';
import {Form} from "./Components/Form/Form";
import userEvent from "@testing-library/user-event";
import { Provider } from "react-redux";
import {store} from "./store";

const render = (component: any) => rtlRender(
    <Provider store={store}>
      {component}
    </Provider>
)



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
    const res = render(<Form />);

    const input = screen.getByLabelText("Email");
    userEvent.type(input, "test@mailcom");
    expect(input).toHaveValue("test@mailcom");
    expect(screen.getByText((/заполните Email правильно/i)).parentNode).toHaveStyle(`display: inline-flex`);

  });
  test('pass invalid email', () => {
    const res = render(<Form />);

    const input = screen.getByLabelText("Email");
    userEvent.type(input, "test-mail.com");
    expect(input).toHaveValue("test-mail.com");
    expect(screen.getByText((/заполните Email правильно/i)).parentNode).toHaveStyle(`display: inline-flex`);
  });
  test('pass invalid model', () => {
    render(<Form />);

    const input = screen.getByLabelText("Модель");
    checkInputWithStyles(input, 'A7', /Только латинские буквы и цифры от 4х до 20 символов/i, `display: block` )
    checkInputWithStyles(input, 'asads123!', /Только латинские буквы и цифры от 4х до 20 символов/i, `display: block` )
    checkInputWithStyles(input, 'q'.repeat(21), /Только латинские буквы и цифры от 4х до 20 символов/i, `display: block` )
    checkInputWithStyles(input, 'q'.repeat(3), /Только латинские буквы и цифры от 4х до 20 символов/i, `display: block` )

  });
  test('pass valid model', () => {
    render(<Form />);

    const input = screen.getByLabelText("Модель");
    checkInputWithStyles(input, 'qashqai', /Только латинские буквы и цифры от 4х до 20 символов/i, `display: none` )
    checkInputWithStyles(input, 'qashqai12', /Только латинские буквы и цифры от 4х до 20 символов/i, `display: none` )
    checkInputWithStyles(input, 'q'.repeat(20), /Только латинские буквы и цифры от 4х до 20 символов/i, `display: none` )
    checkInputWithStyles(input, 'q'.repeat(4), /Только латинские буквы и цифры от 4х до 20 символов/i, `display: none` )

  });
  test('pass invalid brand', () => {
    render(<Form />);
    const input = screen.getByLabelText("Марка");

    checkInputWithStyles(input, 'a'.repeat(21), /Только латинские буквы от 4х до 20 символов/i, `display: block` )
    checkInputWithStyles(input, 'п'.repeat(21), /Только латинские буквы от 4х до 20 символов/i, `display: block` )
    checkInputWithStyles(input, '22222', /Только латинские буквы от 4х до 20 символов/i, `display: block` )
    checkInputWithStyles(input, 'g', /Только латинские буквы от 4х до 20 символов/i, `display: block` )
  });
  test('pass valid brand', () => {
    render(<Form />);
    const input = screen.getByLabelText("Марка");

    checkInputWithStyles(input, 'a'.repeat(20), /Только латинские буквы от 4х до 20 символов/i, `display: none` )
    checkInputWithStyles(input, 'a'.repeat(4), /Только латинские буквы от 4х до 20 символов/i, `display: none` )
  });
})

const checkInputWithStyles = (element: HTMLElement, value: string, query: RegExp, css: string) => {
  userEvent.clear(element);
  userEvent.type(element, value);
  expect(element).toHaveValue(value);
  element.blur()
  expect(screen.getByText(query).cloneNode(true)).toHaveStyle(css);

}