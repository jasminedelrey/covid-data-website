import React from 'react';
import logo from './logo.svg';
import './App.css';
import {
  BrowserRouter as Router,
  Link,
  Route,
  Switch
} from 'react-router-dom';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Home/>
        </Route>

        <Route exact path="/Covid/:Covidid">
        <Covid/> 
        </Route> 

      </Switch>
    </Router>
  );
}

export default App;
