import {
    RECEIVE_QUESTIONS,
    ADD_QUESTION,
    SAVE_QUESTION_ANSWER,
  } from "../actions/questions";
  
  export default function questions(state = {}, action) {
    switch (action.type) {
      case RECEIVE_QUESTIONS:
        return {
          ...state,
          ...action.questions,
        };
      case ADD_QUESTION:
        const { question } = action
        if (question) { // check if question exists
          return {
            ...state,
            [question.id]: question,
          }
        }
        return state;
      case SAVE_QUESTION_ANSWER:
        const { authedUser, qid, answer } = action;
        if (authedUser && qid && answer) { // check if all properties exist
          return {
            ...state,
            [qid]: {
              ...state[qid],
              [answer]: {
                ...state[qid][answer],
                votes: state[qid][answer].votes.concat([authedUser])
              }
            }
          }
        }
        return state;
      default:
        return state
    }
  }