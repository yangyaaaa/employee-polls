import { Fragment, useEffect } from "react";
import { connect } from "react-redux";
import { LoadingBar } from "react-redux-loading-bar";
import PollsList from "./PollsList";
import { handleInitialData } from "../actions/initData";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import PollDetails from "./PollDetails";
import AddPoll from "./AddPoll";
import Leaders from "./Leaderboard";
import Login from "./Login";
import NavComponent from "./NavBar";
import ErrorPage from "./PageNotFound";
import { Navigate, useLocation } from "react-router-dom";

function App(props) {
  const location = useLocation();

  useEffect(() => {
    props.dispatch(handleInitialData());
  }, [props.dispatch]);  

  const isUserAuthorized = props.authedUser !== null;

  console.log("!isUserAuthorized", !isUserAuthorized);

  function ProtectedRoute({ children }) {
    return isUserAuthorized ? (
      children
    ) : (
      <Navigate to="/login" replace state={{ path: location.pathname }} />
    );
  }

  return (
    <Fragment>
      {!isUserAuthorized ? null : <NavComponent />}
      <LoadingBar />
      <Routes>
        <Route
          path="/"
          exact
          element={
            <ProtectedRoute>
              <PollsList />
            </ProtectedRoute>
          }
        />
        <Route
          path="/questions/:question_id"
          element={
            <ProtectedRoute>
              <PollDetails />
            </ProtectedRoute>
          }
        />
        <Route
          path="/add"
          element={
            <ProtectedRoute>
              <AddPoll />
            </ProtectedRoute>
          }
        />
        <Route
          path="/leaderboard"
          element={
            <ProtectedRoute>
              <Leaders />
            </ProtectedRoute>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </Fragment>
  );
}

const mapStateToProps = ({ authedUser }) => ({ authedUser });

export default connect(mapStateToProps)(App);