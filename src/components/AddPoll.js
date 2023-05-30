import { useState } from "react";
import { handleAddPoll } from "../actions/questions";
import { connect } from "react-redux";
import { useNavigate, Link } from "react-router-dom";

const AddPoll = ({ dispatch, authedUser }) => {
  const navigate = useNavigate();

  const [firstOptionText, setFirstOptionText] = useState("");
  const [secondOptionText, setSecondOptionText] = useState("");

  const handleOptionOne = (e) => {
    const text = e.target.value;
    setFirstOptionText(text);
  };

  const handleOptionTwo = (e) => {
    const text = e.target.value;
    setSecondOptionText(text);
  };

  const handleAddNewPoll = (e) => {
    e.preventDefault();

    const newPoll = {
      author: authedUser,
      optionOneText: firstOptionText,
      optionTwoText: secondOptionText,
    };

    dispatch(handleAddPoll(newPoll));

    setFirstOptionText("");
    setSecondOptionText("");

    navigate("/");
  };

  const validInputs =
    firstOptionText === null ||
    firstOptionText === "" ||
    firstOptionText === undefined ||
    secondOptionText === null ||
    secondOptionText === "" ||
    secondOptionText === undefined;

  return (
    <div className="add-poll-container">
      <form onSubmit={handleAddNewPoll}>
        <h3>Would you rather</h3>
        <label>
          Option One:
          <textarea
            placeholder="Enter your first option here"
            value={firstOptionText}
            onChange={handleOptionOne}
            maxLength={120}
          />
        </label>
        <label>
          Option Two:
          <textarea
            placeholder="Enter your second option here"
            value={secondOptionText}
            onChange={handleOptionTwo}
            maxLength={120}
          />
        </label>
        <input
          type="submit"
          disabled={validInputs}
          value={"Add new Poll"}
        />
      </form>
      <Link to="/">Back to Home</Link>
    </div>
  );
};

const mapStateToProps = ({ authedUser }) => {
  console.log("authedUser: ", authedUser);
  return {
    authedUser,
  };
};

export default connect(mapStateToProps)(AddPoll);
