import React from 'react';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import { render, fireEvent } from '@testing-library/react';
import Logout from '../components/Logout';

const mockStore = configureMockStore();
const store = mockStore({
  authedUser: 'sarahedo',
  users: {
    sarahedo: {
      name: 'Sarah Edo',
      avatarURL: 'https://image.url',
    },
  },
});

describe('Logout Component', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = render(
      <Provider store={store}>
        <Logout />
      </Provider>
    );
  });

  test('renders without crashing', () => {
    expect(wrapper).toBeTruthy();
  });

  test('renders user name correctly', () => {
    const { getByText } = wrapper;
    const userName = getByText(/Sarah Edo/i);
    expect(userName).toBeInTheDocument();
  });

  test('handleSignOut function is called when Log Out button is clicked', () => {
    const { getByText } = wrapper;
    const logoutButton = getByText(/Log Out/i);

    fireEvent.click(logoutButton);

    const actions = store.getActions();
    expect(actions[0]).toEqual({ type: 'SET_AUTHED_USER', id: null });
  });
});
