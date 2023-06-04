import React from "react";
import { connect } from "react-redux";
import { setAuthedUser } from "../actions/authedUser";

const Logout = ({ name, dispatch }) => {
  const handleSignOut = (e) => {
    e.preventDefault();
    dispatch(setAuthedUser(null));
  };

  return (
    <div >
      <div >
        <p >{name}</p>
      </div>
      <div >
        <button onClick={handleSignOut}>
          Log Out
        </button>
      </div>
    </div>
  );
};

const mapStateToProps = ({ authedUser, users }) => ({
  name: users[authedUser].name,
  avatarURL: users[authedUser].avatarURL
});

export default connect(mapStateToProps)(Logout);