import Login from "../components/Login";
import { render, screen, fireEvent } from "@testing-library/react";
import * as React from "react";

import { Provider } from "react-redux";
import { MemoryRouter } from "react-router";
import { store } from '../index'



describe("login", () => {
  it("will return a snapshot", () => {
    const view = render(
      <MemoryRouter>
        <Provider store={store}>
          <Login />
        </Provider>
      </MemoryRouter>
    );
    expect(view).toMatchSnapshot();
  });
});

describe("login content", () => {  
  it("will pass if all Dom items exists", () => {
    render(
      <MemoryRouter>
        <Provider store={store}>
          <Login />
        </Provider>
      </MemoryRouter>
    );
    const nameInput = screen.queryByTestId("testId-name-input");
    const passwrodInput = screen.queryByTestId("testId-password-input");
    const submitButton = screen.queryByTestId("testId-submit-button");
    expect(nameInput).toBeInTheDocument();
    expect(passwrodInput).toBeInTheDocument();
    expect(submitButton).toBeInTheDocument();
  });


  it("will onSubmit with right auth data no error message", () => {
    render(
      <MemoryRouter>
        <Provider store={store}>
          <Login />
        </Provider>
      </MemoryRouter>
    );

    const userNameInput = screen.getByTestId("testId-name-input");
    fireEvent.change(userNameInput, { target: { value: "Zenobia Oshikanlu" } });

    const passwordInput = screen.getByTestId("testId-password-input");
    fireEvent.change(passwordInput, { target: { value: "pass246" } });

    const submitButton = screen.getByTestId("testId-submit-button");
    fireEvent.click(submitButton);

    expect(userNameInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(submitButton).toBeInTheDocument();
  });

  it("will show error message onSubmit with wrong auth data", () => {
    render(
      <MemoryRouter>
        <Provider store={store}>
          <Login />
        </Provider>
      </MemoryRouter>
    );

    const submitButton = screen.getByTestId("testId-submit-button");
    fireEvent.click(submitButton);
    expect(screen.getByText("Invalide user Log In")).toBeInTheDocument();
  });
});