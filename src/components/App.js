import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { connect } from "react-redux";
import { handleInitialData } from "../actions/initData";
import Dashboard from "./dashboard/Dashboard";
import NewPoll from "./NewQuestion";
import Leaderboard from "./Leaderboard";
import Navbar from "./NavBar";
import Login from "./Login";
import PollQuestion from "./PollQuestion";
import Page404 from "./PageNotFound";
import './App.css';

function App  ({ authedUser, dispatch }) {
  useEffect(() => {
    dispatch(handleInitialData());
  }, [dispatch]);

  return (
    <Router>
      {authedUser !== null ? (
        <>
        <Navbar />
        <Routes>
          <Route path='/login' element={<Login/>}/>
          <Route path='/' element={<Dashboard />}/>
          <Route path='/leaderboard' element={<Leaderboard />}/>
          <Route path='/questions/:id' element={<PollQuestion />}/>
          <Route path="/new" element={<NewPoll />} />
          <Route path="*" element={<Page404/>}/>
        </Routes>
        </>
      ):(
        <Login />
      )}
    </Router>
  );
};

const mapStateToProps = ({ authedUser }) => ({
  authedUser,
});

export default connect(mapStateToProps)(App);
