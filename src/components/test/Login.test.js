import React from "react";
import { shallow } from "enzyme";
import { Login } from "./Login";

describe("Login component", () => {
  const users = [
    { id: "user1", name: "User 1" },
    { id: "user2", name: "User 2" },
  ];

  it("renders without crashing", () => {
    shallow(<Login users={users} />);
  });

  it("updates selectedUser state when user is selected", () => {
    const wrapper = shallow(<Login users={users} />);
    const select = wrapper.find("select");
    const event = { target: { value: "user1" } };

    select.simulate("change", event);
    expect(wrapper.state("selectedUser")).toBe("user1");
  });

  it("updates password state when password is entered", () => {
    const wrapper = shallow(<Login users={users} />);
    const input = wrapper.find("input[type='password']");
    const event = { target: { value: "password123" } };

    input.simulate("change", event);
    expect(wrapper.state("password")).toBe("password123");
  });

  it("calls dispatch with setAuthedUser action when form is submitted", () => {
    const dispatchMock = jest.fn();
    const wrapper = shallow(<Login users={users} dispatch={dispatchMock} />);
    const form = wrapper.find("form");
    const event = { preventDefault: jest.fn() };

    wrapper.setState({ selectedUser: "user1", password: "password123" });
    form.simulate("submit", event);
    expect(dispatchMock).toHaveBeenCalledWith(setAuthedUser("user1"));
  });
});
