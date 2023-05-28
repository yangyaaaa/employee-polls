
import { connect } from "react-redux";
import { formatDate } from "../utils/helpers";
import { Link } from "react-router-dom";

const PollItem = (props) => {
  return (
    <Link className="poll-item" to={`/questions/${props.pollId}`} >
      <h4>{props.pollText} </h4>
      <div className="poll-metadata">
      <span className="author-name">created by: {props.authorName.name}</span>
      <span className="poll-date">creation Date: {props.pollDate}</span>
      </div>
    </Link>
  );
};

const mapStateToProps = ({ polls, users }, { pollId }) => {
  const poll = polls[pollId];
  const authorName = users[poll.author];
  const pollDate = formatDate(poll.timestamp);
  const pollText = `Would you rather ${poll.optionOne.text} or ${poll.optionTwo.text}?`;

  return {
    pollId,
    pollText,
    authorName,
    pollDate

  };
};

export default connect(mapStateToProps)(PollItem);