import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import ProductsList from '../containers/ProductsList';
import Product from '../containers/Single';
import Login from '../containers/Login';
import AddProduct from '../containers/AddProduct';

export default function App() {
  return (
    <Router>
      <section>
        <Switch>
          <Route exact path="/" component={ProductsList} />
          <Route path="/product/:id" component={Product} />
          <Route path="/login" component={Login} />
          <Route path="/new-product" component={AddProduct} />
        </Switch>
      </section>
    </Router>
  );
}
