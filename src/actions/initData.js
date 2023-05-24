import { getInitialData, saveQuestionAnswer } from "../utils/test/api";
import { receiveUsers, addAnswerToUser } from "./users";
import { receiveQuestions, handleAnswer } from "./questions";

export const handleInitialData = () => {
  return async (dispatch) => {
    const { users, questions } = await getInitialData();
    dispatch(receiveUsers(users));
    dispatch(receiveQuestions(questions));
  };
};

export const handleSaveAnswer = (answer) => {
  return (dispatch) => {
    saveQuestionAnswer(answer)
      .then(() => {
        dispatch(handleAnswer(answer));
        dispatch(addAnswerToUser(answer));
      })
      .catch((e) => {
        console.warn("Error in handleSaveAnswer: ", e);
      });
  };
};