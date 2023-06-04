import React, { Fragment, useState } from "react";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createPoll } from "../actions/shared";
import { Form, Input, Button, Card, Typography } from "antd";

const NewPoll = ({ name, avatarURL, dispatch }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [optionOneText, setOptionOneText] = useState("");
  const [optionTwoText, setOptionTwoText] = useState("");
  const navigate = useNavigate();

  const handleCreatePoll = (e) => {
    e.preventDefault();
    setIsLoading(true);
    dispatch(createPoll(optionOneText, optionTwoText))
      .then(() => {
        setTimeout(() =>{
          navigate("/");
          setIsLoading(false);
        }, 2000);
      })
      .catch((error) => {
        console.log("Error creating poll: ", error);
      });
  };

  return (
    <Fragment>
      <Typography.Title >New Poll</Typography.Title>
      <div >
        <Card >
          <div >
            <div >
              <img src={avatarURL} alt={name} />
            </div>
          </div>
          <Form style={{ padding: "20px" }}>
            <Typography.Title >Would you rather &hellip;</Typography.Title>
            <Form.Item label="Option One">
              <Input.TextArea
                value={optionOneText}
                onChange={({ target }) => setOptionOneText(target.value)}
              />
            </Form.Item>
            <Form.Item label="Option Two">
              <Input.TextArea
                value={optionTwoText}
                onChange={({ target }) => setOptionTwoText(target.value)}
              />
            </Form.Item>
            <Form.Item>
              <Button
                type="primary"
                block
                onClick={handleCreatePoll}
                disabled={optionOneText === "" || optionTwoText === "" || isLoading}
              >
                {isLoading ? 'Creating...' : 'Creat Poll'}
                
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </div>
    </Fragment>
  );
};

const mapStateToProps = ({ authedUser, users }) => {
  const user = users[authedUser];
  return {
    name: user.name,
    avatarURL: user.avatarURL,
  };
};

export default connect(mapStateToProps)(NewPoll);