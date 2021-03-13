import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import ProductsList from '../containers/ProductsList';
import Product from '../containers/Single';

export default function App() {
  return (
    <Router>
      <section>
        <Switch>
          <Route exact path="/" component={ProductsList} />
          <Route path="/product/:id" component={Product} />
        </Switch>
      </section>
    </Router>
  );
}
