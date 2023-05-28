import { _saveQuestion, _saveQuestionAnswer } from "../utils/_DATA";

describe("_saveQuestion", () => {
  it("will return success if a question in the desired foramat is passed", async () => {
    const testQuestion = {
      optionOneText: "option 1",
      optionTwoText: "option 2",
      author: "Aya Salama",
    };

    const result = await _saveQuestion(testQuestion);
    expect(result.optionOne.text).toEqual(testQuestion.optionOneText);
    expect(result.optionTwo.text).toEqual(testQuestion.optionTwoText);
    expect(result.author).toEqual(testQuestion.author);
  });

  it("will return Error if incorrect data is passed", async () => {
    const testQuestion = { optionOneText: "option 1" };
    await expect(_saveQuestion(testQuestion)).rejects.toEqual(
      "Please provide optionOneText, optionTwoText, and author"
    );
  });
});

describe("_saveQuestionAnswer", () => {
  it("return true when correctly formatted data is passed", async () => {
    const answer = {
      authedUser: "zoshikanlu",
      qid: "6ni6ok3ym7mf1p33lnez",
      answer: "optionTwo",
    };

    const result = await _saveQuestionAnswer(answer);
    expect(result).toEqual(true);
  });

  it("return error if incorrect data is passed", async () => {
    const errorMessage = "Please provide authedUser, qid, and answer";
    await expect(_saveQuestionAnswer("dada")).rejects.toEqual(errorMessage);
  });
});