import React, { useEffect, useState } from "react";
import CreateTask from "components/Tasks/CreateTask";
import EditTask from "components/Tasks/EditTask";
import ShowTask from "components/Tasks/ShowTask";
import Dashboard from "components/Dashboard";
import Signup from "components/Authentication/Signup";

import { Route, Switch, BrowserRouter as Router } from "react-router-dom";
const App = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/signup" component={Signup} />
        <Route exact path="/tasks/:id/edit" component={EditTask} />
        <Route exact path="/tasks/create" component={CreateTask} />
        <Route exact path="/tasks/:id/show" component={ShowTask} />
        <Route exact path="/dashboard" component={Dashboard} />
      </Switch>
    </Router>
  );
};

export default App;
