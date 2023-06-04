import { _saveQuestion, _saveQuestionAnswer } from "../utils/_DATA";

describe("_saveQuestion", () => {
  it("will save and return a formatted question", async () => {
    const author = "author_id";
    const optionOneText = "option_one_text";
    const optionTwoText = "option_two_text";
    const question = { author, optionOneText, optionTwoText };
    const expectation = {
      "formattedQuestion": {
        "author": "author_id",
        "optionOne": {
          "text": "option_one_text",
          "votes": expect.any(Array)
        },
        "optionTwo": {
          "text": "option_two_text",
          "votes": expect.any(Array)
        },
        "timestamp": expect.any(Number),
        "id": expect.any(String)
      }
    };    

    await expect(_saveQuestion(question)).resolves.toMatchObject(expectation);
  });

  it("will return an error", async () => {
    await expect(_saveQuestion({})).rejects.toEqual(
      "Please provide optionOneText, optionTwoText, and author"
    );
  });
});

describe("_saveQuestionAnswer", () => {
  it("will save the answer to the question and return true", async () => {
    const authedUser = "zoshikanlu";
    const qid = "8xf0y6ziyjabvozdd253nd";
    const answer = "optionTwo";
    const update = { authedUser, qid, answer };

    await expect(_saveQuestionAnswer(update)).resolves.toBe(true);
  });

  it("will return an error", async () => {
    await expect(_saveQuestionAnswer({})).rejects.toEqual(
      "Please provide authedUser, qid, and answer"
    );
  });
});