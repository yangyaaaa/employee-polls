import { handleAnswer } from "../actions/questions";

export const RECEIVE_USERS = "RECEIVE_USERS";
export const ADD_QUESTION_TO_USER = "ADD_QUESTION_TO_USER";
export const ADD_ANSWER_TO_USER = "ADD_ANSWER_TO_USER";

export function receiveUsers(users) {
  return {
    type: RECEIVE_USERS,
    users,
  };
}

export function addQuestionToUser({ id, author }) {
  return {
    type: ADD_QUESTION_TO_USER,
    id,
    author,
  };
}

export function addAnswerToUser({ authedUser, qid, answer }) {
  return {
    type: ADD_ANSWER_TO_USER,
    authedUser,
    qid,
    answer,
  };
}

export function handleSaveQuestionAnswer(authUser, qid, answer) {
  return (dispatch) => {
    dispatch(addAnswerToUser(authUser, qid, answer));
    dispatch(handleAnswer(authUser, qid, answer));
  };
}