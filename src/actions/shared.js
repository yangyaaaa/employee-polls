import { 
  fetchData, 
  saveQuestion, 
  saveQuestionAnswer 
} from "../utils/api";

import { 
  createQuestion, 
  receiveUsers, 
  saveAnswer 
} from "./users";

import { 
  addQuestion, 
  receiveQuestions, 
  saveVote 
} from "./questions";

import { 
  showLoading, 
  hideLoading 
} from "react-redux-loading-bar";

const handleInitialData = () => async (dispatch) => {
  dispatch(showLoading());
  const { users, questions } = await fetchData();
  dispatch(receiveUsers(users));
  dispatch(receiveQuestions(questions));
  dispatch(hideLoading());
};

const handleSaveQuestionAnswer = (questionId, answerId) => (dispatch, getState) => {
  const { authedUser } = getState();
  dispatch(showLoading());
  dispatch(saveAnswer(authedUser, questionId, answerId));
  dispatch(saveVote(authedUser, questionId, answerId));
  dispatch(hideLoading());
  return saveQuestionAnswer(authedUser, questionId, answerId);
};

const createPoll = (optionOneText, optionTwoText) => async (dispatch, getState) => {
  const { authedUser } = getState();
  dispatch(showLoading());
  try {
    const response = await saveQuestion({
      author: authedUser,
      optionOneText,
      optionTwoText,
    });
    const question = response.formattedQuestion;
    if (question && question.id && question.author) {
    dispatch(createQuestion(question));
    dispatch(addQuestion(question));
  }else {
    console.error('Question is not defined or does not have the expected properties', question);
  }
  }catch (e) {
    console.error("An error occurred with [createPoll]: ", e);
  }
  dispatch(hideLoading());
};

export { 
  handleInitialData, 
  handleSaveQuestionAnswer, 
  createPoll 
};