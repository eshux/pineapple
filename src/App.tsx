import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Api from './pages/api';
import Home from './pages/home';

const App = () => {
  return (
    <Router>
      <Switch>
        <Route path="/api">
          <Api />
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </Router>
  );
};

export default App;
