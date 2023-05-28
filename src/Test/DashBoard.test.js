import PollsList from "../components/PollsList";
import { render, screen } from "@testing-library/react";
import * as React from "react";

import { MemoryRouter } from "react-router";
import { Provider } from "react-redux";
import thunk from 'redux-thunk';
import configureStore from "redux-mock-store";


const mockedStore = configureStore([thunk]);

describe("DashBoard", () => {
  let mockStore;

  beforeEach(() => {
    mockStore = mockedStore(appData)});

  it("will catch a snapshot for DashBoard", () => {
    const view = render(
      <MemoryRouter>
        <Provider store={mockStore}>
          <PollsList />
        </Provider>
      </MemoryRouter>
    );
    expect(view).toMatchSnapshot();
  });

  it("will have expected elements", () => {
    render(
      <MemoryRouter>
        <Provider store={mockStore}>
          <PollsList />
        </Provider>
      </MemoryRouter>
    );
    const answeredTab = screen.getByTestId("answered-polls-test-id");
    expect(answeredTab).toBeInTheDocument();

    const unAnsweredTab = screen.getByTestId("unanswered-polls-test-id");
    expect(unAnsweredTab).toBeInTheDocument();
  });
});






const appData = {
  "authedUser": "sarahedo",
  "users": {
      "sarahedo": {
          "id": "sarahedo",
          "password": "password123",
          "name": "Sarah Edo",
          "avatarURL": null,
          "answers": {
              "8xf0y6ziyjabvozdd253nd": "optionOne",
              "6ni6ok3ym7mf1p33lnez": "optionOne",
              "am8ehyc8byjqgar0jgpub9": "optionTwo",
              "loxhs1bqm25b708cmbf3g": "optionTwo"
          },
          "questions": [
              "8xf0y6ziyjabvozdd253nd",
              "am8ehyc8byjqgar0jgpub9"
          ]
      },
      "tylermcginnis": {
          "id": "tylermcginnis",
          "password": "abc321",
          "name": "Tyler McGinnis",
          "avatarURL": null,
          "answers": {
              "vthrdm985a262al8qx3do": "optionOne",
              "xj352vofupe1dqz9emx13r": "optionTwo"
          },
          "questions": [
              "loxhs1bqm25b708cmbf3g",
              "vthrdm985a262al8qx3do"
          ]
      },
      "mtsamis": {
          "id": "mtsamis",
          "password": "xyz123",
          "name": "Mike Tsamis",
          "avatarURL": null,
          "answers": {
              "xj352vofupe1dqz9emx13r": "optionOne",
              "vthrdm985a262al8qx3do": "optionTwo",
              "6ni6ok3ym7mf1p33lnez": "optionOne"
          },
          "questions": [
              "6ni6ok3ym7mf1p33lnez",
              "xj352vofupe1dqz9emx13r"
          ]
      },
      "zoshikanlu": {
          "id": "zoshikanlu",
          "password": "pass246",
          "name": "Zenobia Oshikanlu",
          "avatarURL": null,
          "answers": {
              "xj352vofupe1dqz9emx13r": "optionOne"
          },
          "questions": []
      }
  },
  "polls": {
      "8xf0y6ziyjabvozdd253nd": {
          "id": "8xf0y6ziyjabvozdd253nd",
          "author": "sarahedo",
          "timestamp": 1467166872634,
          "optionOne": {
              "votes": [
                  "sarahedo"
              ],
              "text": "Build our new application with Javascript"
          },
          "optionTwo": {
              "votes": [],
              "text": "Build our new application with Typescript"
          }
      },
      "6ni6ok3ym7mf1p33lnez": {
          "id": "6ni6ok3ym7mf1p33lnez",
          "author": "mtsamis",
          "timestamp": 1468479767190,
          "optionOne": {
              "votes": [],
              "text": "hire more frontend developers"
          },
          "optionTwo": {
              "votes": [
                  "mtsamis",
                  "sarahedo"
              ],
              "text": "hire more backend developers"
          }
      },
      "am8ehyc8byjqgar0jgpub9": {
          "id": "am8ehyc8byjqgar0jgpub9",
          "author": "sarahedo",
          "timestamp": 1488579767190,
          "optionOne": {
              "votes": [],
              "text": "conduct a release retrospective 1 week after a release"
          },
          "optionTwo": {
              "votes": [
                  "sarahedo"
              ],
              "text": "conduct release retrospectives quarterly"
          }
      },
      "loxhs1bqm25b708cmbf3g": {
          "id": "loxhs1bqm25b708cmbf3g",
          "author": "tylermcginnis",
          "timestamp": 1482579767190,
          "optionOne": {
              "votes": [],
              "text": "have code reviews conducted by peers"
          },
          "optionTwo": {
              "votes": [
                  "sarahedo"
              ],
              "text": "have code reviews conducted by managers"
          }
      },
      "vthrdm985a262al8qx3do": {
          "id": "vthrdm985a262al8qx3do",
          "author": "tylermcginnis",
          "timestamp": 1489579767190,
          "optionOne": {
              "votes": [
                  "tylermcginnis"
              ],
              "text": "take a course on ReactJS"
          },
          "optionTwo": {
              "votes": [
                  "mtsamis"
              ],
              "text": "take a course on unit testing with Jest"
          }
      },
      "xj352vofupe1dqz9emx13r": {
          "id": "xj352vofupe1dqz9emx13r",
          "author": "mtsamis",
          "timestamp": 1493579767190,
          "optionOne": {
              "votes": [
                  "mtsamis",
                  "zoshikanlu"
              ],
              "text": "deploy to production once every two weeks"
          },
          "optionTwo": {
              "votes": [
                  "tylermcginnis"
              ],
              "text": "deploy to production once every month"
          }
      }
  },
  "loadingBarReducer": {
      "default": 3
  }
};
