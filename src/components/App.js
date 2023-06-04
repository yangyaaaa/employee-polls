import React, { Fragment, useEffect } from "react";
import { connect } from "react-redux";
import { handleInitialData } from "../actions/shared";
import { Route, Routes } from "react-router-dom";
import Dashboard from "./Dashboard";
import Poll from "./Poll";
import NewPoll from "./NewPoll";
import Leaderboard from "./Leaderboard";
import Login from "./Login";
import Nav from "./Nav";
import ErrorPage from "./PageNotFound";
import "./App.css";


const App = ({ authorized, dispatch }) => {
  useEffect(() => {
    dispatch(handleInitialData());
  }, [dispatch]);

  return (
    <Fragment>
      <Nav />
      <div>
        <Routes>
          {authorized ? (
            <Fragment>
              <Route path="/" element={<Dashboard />} exact />
              <Route path="/leaderboard" element={<Leaderboard />} />
              <Route path="/add" element={<NewPoll />} />
              <Route path="/questions/:id" element={<Poll />} />
              <Route path="*" element={<ErrorPage />} />
            </Fragment>
          ) : (
            <Fragment>
              <Route path="*" element={<Login />} />
            </Fragment>
          )}
        </Routes>
      </div>
    </Fragment>
  );
};
           
const mapStateToProps = ({ authedUser }) => ({ 
  authorized: authedUser !== null,
});

export default connect(mapStateToProps)(App);