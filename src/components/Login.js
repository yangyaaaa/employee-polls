import React, { useState } from "react";
import { connect } from "react-redux";
import { setAuthedUser } from "../actions/authedUser";
import Nav from "./Nav";

const Login = ({ users, dispatch, authedUser }) => {
  const [selectedUser, setSelectedUser] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    dispatch(setAuthedUser(selectedUser));
  };

  const handleSelectUser = ({ target }) => {
    const id =
      target.value !== ""
        ? users.filter(({ id }) => id === target.value)[0].id
        : "";
    setSelectedUser(id);
  };

  return (
    <div>
    {authedUser !== null && <Nav />}
        <div>
        <img
          src={
            "https://i.ibb.co/9pMsBJX/employee.png"
          }
          alt= 'employee polls'
          className="login-pic"
        />
          <h2>Login</h2>
          <form >
            <div >
              <select
                name="user"
                id="login-as"
                onChange={handleSelectUser}
                defaultValue={selectedUser}
                role="combobox"
              >
                <option value="">Select a user</option>
                {users.map(({ id, name }) => (
                  <option key={id} value={id}>
                    {name}
                  </option>
                ))}
              </select>
            </div>

            {users.length !== 0 && selectedUser !== "" && (
              <button onClick={handleLogin}>
                Login
              </button>
            )}
          </form>
        </div>
        </div>
  );
};

const mapStateToProps = ({ users, authedUser }) => {
  return {
    users: Object.values(users),
    authedUser: authedUser,
  };
};

export default connect(mapStateToProps)(Login);