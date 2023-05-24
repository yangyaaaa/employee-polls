import { fireEvent, render } from "@testing-library/react";
import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { store } from "../../store";
import New from './NewQuestion';

describe("NewQuention", () => {
    it("should render the component", () => {
        const component = render(
            <Provider store={store}>
                <BrowserRouter>
                    <New />
                </BrowserRouter>
            </Provider>
        );
        expect(component).toBeDefined();
        expect(component).toMatchSnapshot();
    });

    it("should display all elements", () => {
        const component = render(
            <Provider store={store}>
                <BrowserRouter>
                    <New />
                </BrowserRouter>
            </Provider>
        );

        const firstOptionLabelElement = component.getByTestId("firstOptionLabel");
        const firstOptionInputElement = component.getByTestId("firstOption");
        const secondOptionLabelElement = component.getByTestId("secondOptionLabel");
        const secondOptionInputElement = component.getByTestId("secondOption");
        const submitButtonElement = component.getByTestId("submit-poll");

        expect(firstOptionLabelElement.textContent).toBe("First Option");
        expect(secondOptionLabelElement.textContent).toBe("Second Option");
        expect(submitButtonElement.textContent).toBe("Submit");

        fireEvent.change(firstOptionInputElement, { target: { value: 'Texas' } });
        fireEvent.change(secondOptionInputElement, { target: { value: 'New Hampshire' } });
        expect(firstOptionInputElement.value).toBe("Texas");
        expect(secondOptionInputElement.value).toBe("New Hampshire");
    });
});