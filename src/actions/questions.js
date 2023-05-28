import { showLoading, hideLoading } from "react-redux-loading-bar";
import { savePoll } from "../utils/api";
import {updateUserQuestions} from "./users";

export const GET_POLLS = "GET_ALL_POLLS";
export const CREATE_POLL = "CREATE_POLL";

export function getPolls(polls) {
  return {
    type: GET_POLLS,
    polls,
  };
}

function createPoll(poll) {
  return {
    type: CREATE_POLL,
    poll,
  };
}

export function handleAddPoll(poll) {
  return (dispatch) => {
    dispatch(showLoading);
    savePoll(poll)
      .then((poll) => {
        dispatch(createPoll(poll));
        dispatch(updateUserQuestions(poll.id, poll.author))
      })
      .then(() => dispatch(hideLoading));
  };
}