import React from "react";
import Header from '../components/header/header.js';
import './App.css';
import {
  BrowserRouter as Router,
  Route,
} from "react-router-dom";
import Home from '../components/home/home.js';
import History from '../components/history/history.js';
import TestReport from "./testreport/testreport.js";

export default function App(){
      return (
      <Router>
        <Header />     
        <Route exact path="/" component={Home} />
        <Route path="/history" component={History} />
        <Route path="/testreport" component={TestReport} />
      </Router>
    );
}