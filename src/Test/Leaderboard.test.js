import { render, screen, act } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import Leaders from '../components/Leaderboard';
import { _getUsers } from '../utils/_DATA';

jest.mock('../utils/_DATA');

const mockStore = configureMockStore([thunk]);

const store = mockStore({
  users: {
    sarahedo: {
      id: 'sarahedo',
      name: 'Sarah Edo',
      avatarURL: '../../images/snow.jpg',
      answers: {},
      questions: []
    },
    tylermcginnis: {
      id: 'tylermcginnis',
      name: 'Tyler McGinnis',
      avatarURL: '../../images/leaf.jpg',
      answers: {},
      questions: []
    },
    johndoe: {
      id: 'johndoe',
      name: 'John Doe',
      avatarURL: '../../images/tyler.jpg',
      answers: {},
      questions: []
    }
  }
});

describe('Leaders component', () => {
  beforeEach(() => {
    _getUsers.mockResolvedValue(store.getState().users);
  });

  it('displays loading before users are fetched', async () => {
    render(
      <Provider store={store}>
        <Leaders />
      </Provider>
    );

    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('displays users when fetched', async () => {
    await act(async () => {
      render(
        <Provider store={store}>
          <Leaders />
        </Provider>
      );
    });

    expect(screen.getByText('Name: Sarah Edo')).toBeInTheDocument();
    expect(screen.getByText('Name: Tyler McGinnis')).toBeInTheDocument();
    expect(screen.getByText('Name: John Doe')).toBeInTheDocument();
  });

  it('matches snapshot', () => {
    const { asFragment } = render(
      <Provider store={store}>
        <Leaders />
      </Provider>
    );

    expect(asFragment()).toMatchSnapshot();
  });
});
