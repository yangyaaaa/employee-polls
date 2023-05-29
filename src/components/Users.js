import PropTypes from 'prop-types';

const User = ({ userData, ranking }) => {
  return (
    <div className="user-container">
      <div className="avatar-container">
        <img
          className="avatar"
          src={userData.avatarURL ? userData.avatarURL : "https://via.placeholder.com/150"}
          alt={`Avatar of ${userData.name}`}
        />
      </div>
      <div className="user-details">
        <h4 className="user-name">{`Name: ${userData.name}`}</h4>
        {ranking ? <span className="user-ranking">{`Ranking: ${ranking}`}</span> : false}
        <hr className="separator"/>
        <span className="user-questions" >{`Asked Questions: ${userData.questions.length}`}</span>
        <span className="user-answers">{`Answered Questions: ${
          Object.keys(userData.answers).length
        }`}</span>
      </div>
    </div> 
  );
};

User.defaultProps = {
  ranking: 0,
};

User.propTypes = {
  userData: PropTypes.object.isRequired,
  ranking: PropTypes.number
}

export default User;