import React, { useState } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { HomeOutlined, TrophyOutlined, FormOutlined } from "@ant-design/icons";
import { Menu } from "antd";
import Logout from "./Logout";

const items = [
  {
    label: 'Home',
    key: 'home',
    icon: <HomeOutlined />,
    path: '/'
  },
  {
    label: 'Leaderboard',
    key: 'leaderboard',
    icon: <TrophyOutlined />,
    path: '/leaderboard'
  },
  {
    label: 'New Poll',
    key: 'newpoll',
    icon: <FormOutlined />,
    path: '/add'
  },
];

const Nav = ({ authedUser }) => {
  const [current, setCurrent] = useState('home');
  const onClick = (e) => {
    setCurrent(e.key);
  };
  return (
    <div>
    <Menu onClick={onClick} selectedKeys={[current]} mode="horizontal">
    {items.map(item => (
      <Menu.Item key={item.key} icon={item.icon}>
        <Link to={item.path}>
          {item.label}
        </Link>
      </Menu.Item>
    ))}
    </Menu>
      {authedUser && (
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <img src={authedUser.avatarURL} alt={authedUser.name} 
          style={{ width: '30px', height: '30px', borderRadius: '15px' }} />
          <Logout />
        </div>
      )}
      </div>
  );
};

const mapStateToProps = ({ authedUser, users }) => ({
  authedUser: users[authedUser],
});

export default connect(mapStateToProps)(Nav);
