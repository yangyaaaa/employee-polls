import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { connect } from "react-redux";
import { handleSaveQuestionAnswer } from "../actions/shared";
import { withRouter } from "../utils/helpers";
import ErrorPage from "./PageNotFound";
import {
  Card,
  Avatar,
  Typography,
  Radio,
  Form,
  Button,
  Statistic,
  Tag,
} from "antd";

const { Text } = Typography;
const FormItem = Form.Item;
const RadioGroup = Radio.Group;

const INVALID = {
  id: "no-id",
  author: "no-author",
  timestamp: 0,
  optionOne: {
    votes: [],
    text: "Invalid Option",
  },
  optionTwo: {
    votes: [],
    text: "Invalid Option",
  },
};

const Poll = (props) => {
  const {
    exists,
    id,
    name,
    avatarURL,
    optionOne,
    optionTwo,
    completed,
    selected,
    optionOneVotes,
    optionTwoVotes,
    dispatch,
  } = props;
  const [answer, setAnswer] = useState(selected);
  const [OPTION_ONE, OPTION_TWO] = ["optionOne", "optionTwo"];
  const total = optionOneVotes + optionTwoVotes;
  const optionOnePercent = Math.round(100 * (optionOneVotes / total));
  const optionTwoPercent = Math.round(100 * (optionTwoVotes / total));
  const navigate = useNavigate();

  const handleOptionChange = (e) => {
    setAnswer(e.target.value);
  };

  const handleVote = (e) => {
    e.preventDefault();
    dispatch(handleSaveQuestionAnswer(id, answer));
  };

  const handleBack = (e) => {
    e.preventDefault();
    navigate("/");
  };

  return exists ? (
    <div>
      <div >
        <Card>
          <Card.Meta
            avatar={<Avatar src={avatarURL} alt={name} />}
            title={<Text strong>{name} asks</Text>}
          />
          <h3 >Would you rather...</h3>
          <Form onSubmit={handleVote}>
            <FormItem>
              <RadioGroup
                value={answer}
                onChange={handleOptionChange}
                disabled={completed}
              >
                <Radio value={OPTION_ONE}>
                  {optionOne}
                  {completed && (
                    <div >
                      <div >
                        <Statistic title="Votes" value={optionOneVotes} />
                      </div>
                      <div >
                        <Tag
                          color={
                            optionOneVotes >= optionTwoVotes ? "green" : "red"
                          }
                        >
                          {optionOnePercent}%
                        </Tag>
                      </div>
                    </div>
                  )}
                </Radio>
              </RadioGroup>
            </FormItem>

            <FormItem>
              <RadioGroup
                value={answer}
                onChange={handleOptionChange}
                disabled={completed}
              >
                <Radio value={OPTION_TWO}>
                  {optionTwo}
                  {completed && (
                    <div >
                      <div >
                        <Statistic title="Votes" value={optionTwoVotes} />
                      </div>
                      <div >
                        <Tag
                          color={
                            optionOneVotes <= optionTwoVotes ? "green" : "red"
                          }
                        >
                          {optionTwoPercent}%
                        </Tag>
                      </div>
                    </div>
                  )}
                </Radio>
              </RadioGroup>
            </FormItem>
            {!completed && (
              <FormItem>
                <Button
                  type="primary"
                  htmlType="submit"
                  disabled={answer === ""}
                  onClick={handleVote}
                >
                  Vote
                </Button>
              </FormItem>
            )}
          </Form>
        </Card>
      </div>
      <Button onClick={handleBack}>Back</Button>
    </div>
  ) : (
    <ErrorPage />
  );
};

const mapStateToProps = ({ authedUser, users, questions }, { router }) => {
  const user = users[authedUser];
  const { id } = router.params;
  const exists = Object.keys(questions).includes(id);
  const question = questions[id] || INVALID;
  const answers = Object.keys(user.answers);
  const selected = user.answers[id] || "";
  const { optionOne, optionTwo } = question;
  const { name, avatarURL } = users[question.author] || "";

  return {
    exists,
    id,
    avatarURL,
    completed: answers.includes(id),
    name,
    optionOne: optionOne.text,
    optionOneVotes: optionOne.votes.length,
    optionTwo: optionTwo.text,
    optionTwoVotes: optionTwo.votes.length,
    selected,
  };
};

export default withRouter(connect(mapStateToProps)(Poll));