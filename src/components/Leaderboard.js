import { useState, useEffect } from "react";
import { connect } from "react-redux";
import User from "./Users";
import { _getUsers } from "../utils/_DATA";
import PropTypes  from 'prop-types'; 


export function Leaders() {
  const [users, setUsers] = useState([]);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    _getUsers().then(fetchedUsers => {
      const sortedUsers = Object.values(fetchedUsers).sort((a, b) => {
        const scoreA = a.questions.length + Object.keys(a.answers).length;
        const scoreB = b.questions.length + Object.keys(b.answers).length;
        return scoreB - scoreA;  // sort in descending order
      });
      setUsers(sortedUsers);
      setLoading(false)
    });
  }, []);
    if (isLoading) {
      return <h2>Loading...</h2>;
    }

  return (
    <div>
      {users.map((user, index) => <User userData={user} ranking={index + 1} />)}
    </div>
  );
}

const mapStateToProps = ({ users }) => {
  const rankedUsers = Object.values(users).sort((user1, user2) => {
    const secondUserRank =
      Object.keys(user2.answers).length + user2.questions.length;
    const firstUserRank =
      Object.keys(user1.answers).length + user1.questions.length;
    return secondUserRank - firstUserRank;
  });

  return {
    rankedUsers,
  };
};

export default connect(mapStateToProps)(Leaders);


Leaders.prototype ={
  rankedUsers: PropTypes.string.isRequired
}
