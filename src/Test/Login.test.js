import { render, fireEvent, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import Login from "../components/Login";
import userReducer from "../../reducers/users";
import authedUserReducer from "../../reducers/authedUser";

describe("<Login />", () => {
  let store;
  let component;

  beforeEach(() => {
    store = configureStore({
      reducer: {
        users: userReducer,
        authedUser: authedUserReducer,
      },
    });

    store.dispatch({
      type: "users/add",
      payload: {
        id: "sarahedo",
        name: "Sarah Edo",
        password: "password123",
      },
    });

    component = render(
      <Provider store={store}>
        <Login />
      </Provider>
    );
  });

  it("should render without crashing", () => {
    expect(component).toBeTruthy();
  });

  it("should update username select value and password on change", async () => {
    const usernameSelect = component.getByTestId("testId-name-input");
    fireEvent.change(usernameSelect, { target: { value: "Sarah Edo" } });

    const passwordInput = component.getByTestId("testId-password-input");

    await waitFor(() => expect(usernameSelect.value).toBe("Sarah Edo"));

    // password field should be updated automatically when username is selected
    expect(passwordInput.value).toBe("password123");
  });

  it("should not allow the password field to be manually edited", () => {
    const passwordInput = component.getByTestId("testId-password-input");
    fireEvent.change(passwordInput, { target: { value: "newPassword" } });
    expect(passwordInput.value).toBe("password123");
  });

  it("should display error message when trying to log in without valid credentials", async () => {
    const usernameSelect = component.getByTestId("testId-name-input");
    fireEvent.change(usernameSelect, { target: { value: "Invalid User" } });

    const submitButton = component.getByTestId("testId-submit-button");
    fireEvent.click(submitButton);

    const errorMessage = await component.findByTestId("error-notifier");

    expect(errorMessage.textContent).toBe("Invalide user Log In");
  });

  it("should successfully log in with valid credentials", async () => {
    const usernameSelect = component.getByTestId("testId-name-input");
    fireEvent.change(usernameSelect, { target: { value: "Sarah Edo" } });

    const submitButton = component.getByTestId("testId-submit-button");
    fireEvent.click(submitButton);

    await waitFor(() =>
      expect(store.getState().authedUser).toBe("sarahedo")
    );
  });
});
