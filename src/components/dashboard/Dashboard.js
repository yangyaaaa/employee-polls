import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Button, Card } from 'antd';

const Dashboard = ({authedUser, questions, users}) => {
  const unanswered = (question) => (
      !question.optionOne.votes.includes(authedUser.id)
      && !question.optionTwo.votes.includes(authedUser.id)
  );

  const answered = (question) => (
      question.optionOne.votes.includes(authedUser.id)
      || question.optionTwo.votes.includes(authedUser.id)
  );

  return (
    <div>
      <div className="container-parent">
          <h2 className="">New Questions</h2>
          {questions
              .filter(unanswered)
              .map((question) => (
                  <div key={question.id}>
                    <Card title={question.author} border={false} style={{ width: 300 }}>
        <p>{new Date(question.timestamp).toDateString()}</p>
        <Link to={'questions/' + question.id}>
            <Button type="primary">Show</Button>
        </Link>
    </Card>
                  </div>
              ))}
      </div>

      <div className="container-parent">
          <h2 className="">Done</h2>
          {questions
              .filter(answered)
              .map((question) => (
                  <div key={question.id}>
                     <Card title={question.author} border={false} style={{ width: 300 }}>
        <p>{new Date(question.timestamp).toDateString()}</p>
        <Link to={'questions/' + question.id}>
            <Button type="primary">Show</Button>
        </Link>
    </Card>
                  </div>
              ))}
      </div>
    </div>
  )
}

const mapStateToProps = ({authedUser, questions, users}) => ({
  authedUser,
  questions: Object.values(questions).sort((a, b) => b.timestamp - a.timestamp),
  users
});

export default connect(mapStateToProps)(Dashboard);
