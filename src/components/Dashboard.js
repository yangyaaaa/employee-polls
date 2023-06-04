import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Layout, Button, Typography, Space, Divider, List } from "antd";
import PollItem from "./PollItem";

const { Content } = Layout;
const { Title } = Typography;

const Dashboard = ({ unanswered, completed }) => {
    const [viewState, setViewState] = useState("UNANSWERED");
    const [title, setTitle] = useState("Unanswered Polls");
    const [list, setList] = useState(unanswered);

    useEffect(() => {
      setList(unanswered);
    }, [unanswered]);    

    const handleChangeView = (value) => {
        setViewState(value);
        switch (value) {
          case "UNANSWERED":
            setTitle("Unanswered Polls");
            setList(unanswered);
            break;
          case "COMPLETED":
            setTitle("Completed Polls");
            setList(completed);
            break;
          default:
            break;
        }
      };
  
    return (
        <Layout>
        <Content style={{ padding: '50px'}}>
        <Title level={2} >Dashboard</Title>
        <Space direction="vertical" size="large" style={{ width: '100%' }}>
            <Button.Group>
              <Button
                type={viewState === "UNANSWERED" ? "primary" : "default"}
                onClick={() => handleChangeView("UNANSWERED")}
              >
                Unanswered Polls
              </Button>
              <Button
                type={viewState === "COMPLETED" ? "primary" : "default"}
                onClick={() => handleChangeView("COMPLETED")}
              >
                Completed Polls
              </Button>
            </Button.Group>
            <Divider />
            <Title level={3}>{title}</Title>
            <List
            dataSource={list}
            renderItem={id => <List.Item><PollItem id={id} /></List.Item>}
          />
        </Space>
        </Content>
      </Layout>
    );
  };
  
  
  const mapStateToProps = ({ authedUser, users, questions }) => {
    const { answers } = users[authedUser];
  
    const completed = Object.keys(answers)
      .map((id) => questions[id])
      .sort((a, b) => b.timestamp - a.timestamp)
      .map(({ id }) => id);
  
    const unanswered = Object.values(questions)
      .sort((a, b) => b.timestamp - a.timestamp)
      .filter(({ id }) => !completed.includes(id))
      .map(({ id }) => id);
  
    const all = Object.values(questions)
      .sort((a, b) => b.timestamp - a.timestamp)
      .map(({ id }) => id);
  
    return {
      unanswered,
      completed,
      all,
    };
  };
  
  export default connect(mapStateToProps)(Dashboard);