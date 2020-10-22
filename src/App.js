import React from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Link,
  Route,
  Switch
} from 'react-router-dom';
import Home from './Components/Home/Home'
import Covid from './Components/Covid/Covid'

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
