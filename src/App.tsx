import React from "react";
import "./App.css";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";

import { Route } from "react-router-dom";

const App = () => {
  return (
    <div className="App">
      <header>
        <h1>Melody</h1>
      </header>
      <Route exact path="/" component={Login} />

      <Route path="/dashboard" component={Dashboard} />
    </div>
  );
};

export default App;
