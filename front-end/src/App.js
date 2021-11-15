import Container from './dashboard/Container.js'
import Dashboard from './dashboard/Dashboard.js'
import NotFound from './dashboard/Notfound'
import './App.css';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import React from "react";
import ContainerDetails from "./dashboard/ContainerDetails";

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
            <Route exact path="/">
                <NotFound/>
            </Route>
            <Route exact path="/:jobUuid">
                <Dashboard/>
            </Route>
            <Route exact path="/:jobUuid/views/container-details">
                <ContainerDetails/>
            </Route>
            <Route exact path="/:jobUuid/container/:id">
                <Container/>
            </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
