import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";

import App from "./App";
import { store } from "./store";

import { _saveQuestion, _saveQuestionAnswer } from './_DATA';
import { loginUser } from './actions/authen';
import { initData } from './actions/initData';
import Login from './components/Login';
import NavBar from './components/NavBar';
import PageNotFound from './components/error/PageNotFound';
import LeaderBoard from './components/leaderboard/LeaderBoard';
import New from './components/newpolly/New';

describe("test page PageNotFound", () => {
  it("snapshots", () => {
    const view = render(<PageNotFound />);
    expect(view).toMatchSnapshot();
  });
});

describe("test page New", () => {
  it("snapshots", () => {
    const view = render(
      <MemoryRouter>
        <Provider store={store}>
          <New />
        </Provider>
      </MemoryRouter>
    );
    expect(view).toMatchSnapshot();
  });
});

describe("test page Nav", () => {
  store.dispatch(initData());
  store.dispatch(loginUser({ id: "sarahedo", password: "123456" }));
  it("snapshots", () => {
    const view = render(
      <MemoryRouter>
        <Provider store={store}>
          <NavBar />
        </Provider>
      </MemoryRouter>
    );
    expect(view).toMatchSnapshot();
  });
});

describe("test page LeaderBoard", () => {
  it("snapshots", () => {
    const view = render(
      <MemoryRouter>
        <Provider store={store}>
          <LeaderBoard />
        </Provider>
      </MemoryRouter>
    );
    expect(view).toMatchSnapshot();
  });
});

describe("test page", () => {
  it(" Login snapshots", () => {
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

describe("test page App", () => {
  it("snapshots", () => {
    const view = render(
      <MemoryRouter>
        <Provider store={store}>
          <App />
        </Provider>
      </MemoryRouter>
    );
    expect(view).toMatchSnapshot();
  });
});


describe("test _saveQuestionAnswer", () => {
  it("Async Function", async () => {
      const authedUser = "sarahedo";
      const qid = "vthrdm985a262al8qx3do";
      const answer = "optionOne";
      const result = await _saveQuestionAnswer({ authedUser, qid, answer });
      expect(result).toEqual(true);
  });

  it("Async Function incorrect", async () => {
      const authUser = "sarahed";
      const questionID = "vthrdm985a262al8qx3d";
      const answer = "optionOne";
      try {
          await _saveQuestionAnswer({ authUser, questionID, answer });
      } catch (e) {
          expect(e).toBe("Error");
      }
  });
});

describe("test _saveQuestion", () => {
  it("Async Function", async () => {
      const optionOneText = "1";
      const optionTwoText = "2";
      const author = "sarahedo";
      const result = await _saveQuestion({
          optionOneText,
          optionTwoText,
          author,
      });
      expect(result).not.toEqual("Error");
  });

  it("Async Function incorrect", async () => {
      const optionOneText = "1";
      const optionTwoText = "2";
      const author = "sarahed";
      try {
          await _saveQuestion({ optionOneText, optionTwoText, author });
      } catch (e) {
          expect(e).toBe("Error");
      }
  });
});