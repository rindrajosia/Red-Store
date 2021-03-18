import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import ProductsList from '../containers/ProductsList';
import Product from '../containers/Single';
import Login from '../containers/Login';
import AddProduct from '../containers/AddProduct';
import EditeProduct from '../containers/EditeProduct';
import CreateFavorite from '../containers/CreateFavorite';
import EditeFavorite from '../containers/EditeFavorite';
import FavoritesList from '../containers/FavoritesList';

export default function App() {
  return (
    <Router>
      <section>
        <Switch>
          <Route exact path="/" component={ProductsList} />
          <Route path="/product/:id" component={Product} />
          <Route path="/product-edit/:id" component={EditeProduct} />
          <Route path="/login" component={Login} />
          <Route path="/new-product" component={AddProduct} />
          <Route path="/new-favorite" component={CreateFavorite} />
          <Route path="/favorite" component={FavoritesList} />
          <Route path="/favorite-edit/:id" component={EditeFavorite} />
        </Switch>
      </section>
    </Router>
  );
}
