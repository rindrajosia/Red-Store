import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import ProductsList from '../containers/ProductsList';

export default function App() {
  return (
    <Router>
      <section>
        <Switch>
          <Route exact path="/" component={ProductsList} />
        </Switch>
      </section>
    </Router>
  );
}
