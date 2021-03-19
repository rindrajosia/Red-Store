/* eslint-disable max-len */
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchProducts, changeFilterCategory } from '../actions';
import { URL } from '../constants';

import { getProductByCategory } from '../redux/selectors';
import CategoryFilter from './CategoryFilter';
import Product from '../components/Product';

const ProductComponent = ({
  productData, fetchProducts, changeFilterCategory,
}) => {
  useEffect(() => {
    fetchProducts(`${URL.BASE}${URL.PRODUCTS}`);
  }, [fetchProducts]);

  const handleFilterChange = filterCategory => {
    changeFilterCategory(filterCategory);
  };

  return (
    <div className="small-container">
      <div className="row row-2">
        <Link to="/new-product" className="btn">New Product </Link>
        <Link to="/new-favorite" className="btn">New Favorite </Link>
        <Link to="/favorite" className="btn">Favorite </Link>
        <h2>Recipes Categories</h2>
        <CategoryFilter handleFilterChange={handleFilterChange} />
      </div>
      <div className="row-wrap">
        {productData.loading && <h2 className="info">Loading</h2>}
        {productData.error && <h2 className="info">{productData.error}</h2>}
        {
          productData && productData.products && productData.products.length
            ? productData.products.map(product => <Product key={product.id} product={product} />) : (
              <h2 className="info">No Products for this category.</h2>
            )
        }
      </div>
    </div>
  );
};

ProductComponent.propTypes = {
  productData: PropTypes.oneOfType([PropTypes.object]).isRequired,
  fetchProducts: PropTypes.func.isRequired,
  changeFilterCategory: PropTypes.func.isRequired,
};

const mapStateToProps = state => {
  const { filterCategory } = state;
  const productData = getProductByCategory(state, filterCategory);
  return { productData };
};

export default connect(
  mapStateToProps,
  { fetchProducts, changeFilterCategory },
)(ProductComponent);

/* eslint-enable max-len */
