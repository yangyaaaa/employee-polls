import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { setAuthedUser } from '../actions/authedUser';
import { connect } from 'react-redux';
import "./App.css";

const Login = ({ users, dispatch }) => {
  const [selectedUser, setSelectedUser] = useState("");
  const [password, setPassword] = useState("");
  const location = useLocation();

  // Check if the user was redirected from a protected route
  const shouldShowAlert = location.state && location.state.from;


  const handleSubmit = (e) => {
    e.preventDefault();
    const selectedUserObj = users.find((user) => user.id === selectedUser);

    if (selectedUserObj && selectedUserObj.password === password) {
      dispatch(setAuthedUser(selectedUser));
    } else {
      // Display an error message or perform any other action for incorrect password
      alert("Incorrect password");
    }
  };

  return (
    <div className="form-container">
    <form className="login-form" onSubmit={handleSubmit}>
      <h2>Login</h2>
      {shouldShowAlert && alert("Please log in first.")}
      <label htmlFor="user">Select User:</label>
      <select
        id="user"
        value={selectedUser}
        onChange={(e) => setSelectedUser(e.target.value)}
      >
        <option value="" disabled>
          Select a user
        </option>
        {users.map((user) => (
          <option key={user.id} value={user.id}>
            {user.name}
          </option>
        ))}
      </select>
      <label htmlFor="password">Password:</label>
      <input
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        type="password"
        placeholder="********"
        id="password"
        name="password"
      />
      <button type="submit">Log In</button>
    </form>
  </div>
);
};

const mapStateToProps = ({ users }) => {
return {
  users: Object.values(users),
};
};

export default connect(mapStateToProps)(Login);