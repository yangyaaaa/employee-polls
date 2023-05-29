import { render, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import { MemoryRouter } from "react-router-dom";
import Login from "../components/Login";

const mockStore = configureStore([]);


describe("<Login />", () => {  
  let store;
  let component;

  beforeEach(() => {
    store = mockStore({
      users: {
        user1: {
          id: 'sarahedo',
          name: 'Sarah Edo',
          password: 'password123',
        },
        user2: {
          id: 'tylermcginnis',
          name: 'Tyler McGinnis',
          password: 'abc321',
        },
        user3: {
          id: 'mtsamis',
          name:'Mike Tsamis',
          password: 'xyz123',
        },
        user4: {
          id: 'zoshikanlu',
          name:'Zenobia Oshikanlu',
          password:'pass246',
        }
      },
    });
    store.dispatch = jest.fn();

    component = render(
      <Provider store={store}>
        <MemoryRouter>
          <Login />
        </MemoryRouter>
      </Provider>
    );
  });

  it("should render without crashing", () => {
    expect(component).toBeTruthy();
  });

  it("should match previous snapshot", () => {
    expect(component).toMatchSnapshot();
  });


  it("should update username select value on change", () => {
    const usernameSelect = component.getByTestId('testId-name-input');
    fireEvent.change(usernameSelect, { target: { value: 'Sarah Edo' } });
    expect(usernameSelect).toHaveValue('Sarah Edo');
  });
})