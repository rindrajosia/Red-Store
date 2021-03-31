import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import ProductsList from '../containers/ProductsList';
import AllProducts from '../containers/AllProducts';
import Product from '../containers/Single';
import Login from '../containers/Login';
import Register from '../containers/Register';
import AddProduct from '../containers/AddProduct';
import EditeProduct from '../containers/EditeProduct';
import DeleteProduct from '../containers/DeleteProduct';
import DeleteFavorite from '../containers/DeleteFavorite';
import CreateFavoriteProducts from '../containers/CreateFavoriteProducts';
import FavoriteProduct from '../containers/FavoriteProduct';

export default function App() {
  return (
    <Router>
      <section>
        <Header />
        <Switch>
          <Route exact path="/" component={ProductsList} />
          <Route exact path="/products" component={AllProducts} />
          <Route path="/product/:id" component={Product} />
          <Route path="/product-edit/:id" component={EditeProduct} />
          <Route path="/product-del/:id" component={DeleteProduct} />
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <Route path="/new-product" component={AddProduct} />
          <Route path="/favorite-del/:id" component={DeleteFavorite} />
          <Route path="/add-favorite/:id" component={CreateFavoriteProducts} />
          <Route path="/favorite-product" component={FavoriteProduct} />
        </Switch>
        <Footer />
      </section>
    </Router>
  );
}
