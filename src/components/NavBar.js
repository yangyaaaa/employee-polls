import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { setAuthedUser } from '../actions/authedUser';
import { Breadcrumb } from 'antd';

const Navbar = ({ name, avatarURL, dispatch }) => {
  const logout = (e) => {
    e.preventDefault();
    dispatch(setAuthedUser());
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'space-between',
    borderBottom: '1px solid #ddd', paddingBottom: '10px' }}>
      <Breadcrumb>
        <Breadcrumb.Item>
          <Link to="/">Home</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>
          <Link to="/leaderboard">Leaderboard</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>
          <Link to="/new">NewQuestion</Link>
        </Breadcrumb.Item>
      </Breadcrumb>

    <div style={{ display: 'flex', alignItems: 'center' }}>
        <img 
          src={avatarURL} 
          alt={name} 
          style={{ height: '40px', width: '40px', borderRadius: '50%', marginRight: '10px' }} 
        />
        <span>{name}</span>
        <button
          onClick={logout}
          className='font-medium w-24 h-14 text-center hover:border-b-2 border-black'
        >
          Logout
        </button>
      </div>
    </div>
  );
};

const mapStateToProps = ({ users, authedUser }) => {
    const { name, avatarURL } = users[authedUser];

  return {
    name,
    avatarURL,
  };
};

export default connect(mapStateToProps)(Navbar);
