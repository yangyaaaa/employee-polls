import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { setAuthedUser } from "../actions/authedUser";
import "./App.css";

const NavComponent = (props) => {
  const handleLogOut = () => {
    if (props.userData != null) {
      props.dispatch(setAuthedUser(null));
    }
  };


  return (
    <div className="navbar-container">
     <span> <img 
        src={props.userData.avatarURL} 
        alt="User Avatar" 
        className="user-avatar"
     />
     {props.userData.name}</span>
        <nav data-testid="testId-nav-component">
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/add">Add New Poll</Link>
            </li>
            <li>
              <Link to="/leaderboard">Leaders Board</Link>
            </li>
            <li>
              <Link to="/login" onClick={handleLogOut}>
                Log out
              </Link>
            </li>
          </ul>
        </nav>

    </div>
  );
};

const mapStateToProps = ({ authedUser, users }) => {
  return { userData: users[authedUser] };
};

export default connect(mapStateToProps)(NavComponent);