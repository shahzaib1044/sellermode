import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Form from './components/Form';
import List from './components/List';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Form} />
        <Route exact path="/jobs" component={List} />
      </Switch>
    </Router>
  );
}

export default App;
