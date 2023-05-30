import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ProtectedComponent = ({ children }) => {
  // Replace 'auth.isAuthenticated' with the correct path to your isAuthenticated flag in Redux state
  const isAuthenticated = useSelector(state => state.authedUser !== null);
  const location = useLocation();

  if (!isAuthenticated) {
    return (
      <Navigate 
        to="/login" 
        replace
        state={{ from: location }}
      />
    );
  }

  return children;
};

export default ProtectedComponent;
