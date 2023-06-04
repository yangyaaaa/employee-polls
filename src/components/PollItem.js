import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { formatDate } from "../utils/helpers";
import { Card, Avatar, Button, Typography } from "antd";

const { Text } = Typography;

const PollItem = ({ id, name, avatarURL, timestamp }) => {
  return (
    <Card >
      <div >
        <Avatar size={48} src={avatarURL} />
        <div>
          <Text strong>{name}</Text>
          <Text type="secondary">{formatDate(timestamp)}</Text>
        </div>
      </div>
      <Link to={`/questions/${id}`}>
        <Button type="primary" block>
          Show
        </Button>
      </Link>
    </Card>
  );
};

const mapStateToProps = ({ users, questions }, { id }) => {
  const question = questions[id];

  return {
    id,
    name: users[question.author].name,
    avatarURL: users[question.author].avatarURL,
    timestamp: question.timestamp,
  };
};

export default connect(mapStateToProps)(PollItem);